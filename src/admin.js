import { db, collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from './firebase.js';

let produtosCache = [];
let editandoId = null;

const form = document.getElementById('add-product-form');
const gridProdutos = document.getElementById('products-grid');
const searchInput = document.getElementById('search-input');
const statusMessage = document.getElementById('status-message');
const formTitle = document.getElementById('form-title');
const btnSubmit = document.getElementById('btn-submit');
const btnCancel = document.getElementById('btn-cancel');

// Buscar todos os produtos
async function fetchProdutos() {
    try {
        const querySnapshot = await getDocs(collection(db, "produtos"));
        produtosCache = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        renderProdutos(produtosCache);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        showMessage("Erro ao carregar produtos", "error");
        gridProdutos.innerHTML = '<div class="empty-state"><p>Erro ao carregar produtos</p></div>';
    }
}

// Renderizar produtos
function renderProdutos(produtos) {
    gridProdutos.innerHTML = '';

    if (produtos.length === 0) {
        gridProdutos.innerHTML = '<div class="empty-state"><p>Nenhum produto cadastrado ainda</p></div>';
        return;
    }

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-info">
                <div class="product-header">
                    <span class="product-name">${produto.nome}</span>
                    <span class="product-category">${produto.categoria}</span>
                    ${produto.destaque ? '<span class="product-badge">⭐ Destaque</span>' : ''}
                </div>
                <p class="product-description">${produto.descricao || 'Sem descrição'}</p>
                <div class="product-price">R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}</div>
            </div>
            <div class="product-actions">
                <button class="btn-edit" onclick="editarProduto('${produto.id}')">Editar</button>
                <button class="btn-delete" onclick="deletarProduto('${produto.id}')">Deletar</button>
            </div>
        `;
        gridProdutos.appendChild(card);
    });
}

// Mostrar mensagem de status
function showMessage(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status-message show ${type}`;
    setTimeout(() => {
        statusMessage.classList.remove('show');
    }, 4000);
}

// Adicionar/Atualizar produto
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const produtoData = {
        nome: document.getElementById('nome').value.trim(),
        categoria: document.getElementById('categoria').value,
        preco: parseFloat(document.getElementById('preco').value),
        descricao: document.getElementById('descricao').value.trim(),
        destaque: document.getElementById('destaque').checked
    };

    if (!produtoData.nome || !produtoData.categoria || !produtoData.preco) {
        showMessage("Preencha todos os campos obrigatórios", "error");
        return;
    }

    try {
        if (editandoId) {
            // Atualizar
            await updateDoc(doc(db, "produtos", editandoId), produtoData);
            showMessage("Produto atualizado com sucesso!", "success");
            editandoId = null;
            resetarFormulario();
        } else {
            // Adicionar
            await addDoc(collection(db, "produtos"), produtoData);
            showMessage("Produto adicionado com sucesso!", "success");
            form.reset();
        }
        await fetchProdutos();
    } catch (error) {
        console.error("Erro:", error);
        showMessage("Erro ao salvar produto", "error");
    }
});

// Editar produto
window.editarProduto = async (id) => {
    const produto = produtosCache.find(p => p.id === id);
    if (!produto) return;

    editandoId = id;
    document.getElementById('nome').value = produto.nome;
    document.getElementById('categoria').value = produto.categoria;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('descricao').value = produto.descricao || '';
    document.getElementById('destaque').checked = produto.destaque || false;

    formTitle.textContent = 'Editar Produto';
    btnSubmit.textContent = 'Atualizar';
    btnCancel.style.display = 'inline-block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Deletar produto
window.deletarProduto = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este produto?')) return;

    try {
        await deleteDoc(doc(db, "produtos", id));
        showMessage("Produto deletado com sucesso!", "success");
        await fetchProdutos();
    } catch (error) {
        console.error("Erro ao deletar:", error);
        showMessage("Erro ao deletar produto", "error");
    }
};

// Resetar formulário
function resetarFormulario() {
    form.reset();
    editandoId = null;
    formTitle.textContent = 'Adicionar Produto';
    btnSubmit.textContent = 'Adicionar';
    btnCancel.style.display = 'none';
}

// Cancelar edição
btnCancel.addEventListener('click', resetarFormulario);

// Pesquisar
searchInput.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = produtosCache.filter(p =>
        p.nome.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo)
    );
    renderProdutos(filtrados);
});

// Inicializar
fetchProdutos();
