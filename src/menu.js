import { db, collection, getDocs } from './firebase.js';

document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('produtos-grid');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    let produtosCache = [];

    // Busca no Firestore
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
            grid.innerHTML = "<p>Erro ao carregar o cardápio. Tente novamente.</p>";
        }
    }

    // Renderiza HTML
    function renderProdutos(produtos) {
        grid.innerHTML = '';
        if (produtos.length === 0) {
            grid.innerHTML = '<p>Nenhum produto encontrado.</p>';
            return;
        }

        produtos.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${prod.imagem || 'https://placehold.co/400x300/4A3525/FDF8E7?text=Produto'}" alt="${prod.nome}" loading="lazy">
                <div class="card-content">
                    <div style="display: flex; justify-content: space-between;">
                        <h2 class="card-title">${prod.nome}</h2>
                        ${prod.destaque ? '<span class="badge">Destaque</span>' : ''}
                    </div>
                    <p style="font-size: 0.9rem; color: var(--brown-soft);">${prod.descricao}</p>
                    <div class="card-price">R$ ${parseFloat(prod.preco).toFixed(2).replace('.', ',')}</div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Filtros
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;

        const filtrados = produtosCache.filter(prod => {
            const matchName = prod.nome.toLowerCase().includes(searchTerm);
            const matchCategory = category === 'todos' || prod.categoria === category;
            return matchName && matchCategory;
        });

        renderProdutos(filtrados);
    }

    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);

    // Init
    await fetchProdutos();
});