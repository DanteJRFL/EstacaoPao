import { db, collection, addDoc } from './firebase.js';

document.getElementById('add-product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const novoProduto = {
        nome: document.getElementById('nome').value,
        categoria: document.getElementById('categoria').value,
        preco: Number(document.getElementById('preco').value),
        descricao: document.getElementById('descricao').value,
        destaque: document.getElementById('destaque').checked,
        imagem: 'https://placehold.co/400x300/4A3525/FDF8E7?text=Imagem',
        ingredientes: []
    };

    try {
        await addDoc(collection(db, "produtos"), novoProduto);
        alert("Produto adicionado com sucesso!");
        e.target.reset();
    } catch (error) {
        console.error("Erro ao adicionar: ", error);
        alert("Erro ao adicionar produto.");
    }
});