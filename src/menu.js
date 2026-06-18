import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const container = document.getElementById("produtos-grid");

async function carregarProdutos() {

    const snapshot = await getDocs(
        collection(db, "produtos")
    );

    const produtos = [];

    snapshot.forEach((doc) => {
        produtos.push(doc.data());
    });

    const ordemCategorias = {
        "Cestas": 1,
        "Cafés": 2,
        "Doces": 3,
        "Salgados": 4
    };

    produtos.sort((a, b) => {

        const ordemA = ordemCategorias[a.categoria] || 999;
        const ordemB = ordemCategorias[b.categoria] || 999;

        if (ordemA !== ordemB) {
            return ordemA - ordemB;
        }

        return a.nome.localeCompare(b.nome);
    });

    const categorias = {};

    produtos.forEach(produto => {

        if (!categorias[produto.categoria]) {
            categorias[produto.categoria] = [];
        }

        categorias[produto.categoria].push(produto);
    });

    container.innerHTML = "";

    Object.keys(categorias).forEach(categoria => {

        const produtosHTML = categorias[categoria]
            .map(produto => `
                <div class="card">

                    <div class="card__img-wrap">
                        <img
                            src="${produto.imagem}"
                            alt="${produto.nome}"
                        >
                    </div>

                    <div class="card__info">

                        <h3 class="card__name">
                            ${produto.nome}
                        </h3>

                        <p class="card__desc">
                            ${produto.descricao || ""}
                        </p>

                        <div class="card__price">
                            R$ ${Number(produto.preco).toFixed(2)}
                        </div>

                    </div>

                </div>
            `)
            .join("");

        container.innerHTML += `
            <section class="categoria-container">

                <h2 class="section-title">
                    ${categoria}
                </h2>

                <div class="categoria-grid">
                    ${produtosHTML}
                </div>

            </section>
        `;
    });

}

carregarProdutos();