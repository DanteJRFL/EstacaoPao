import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const grid = document.getElementById("produtos-grid");

async function carregarProdutos() {

    const snapshot = await getDocs(
        collection(db, "produtos")
    );

    grid.innerHTML = "";

    snapshot.forEach((doc) => {

        const produto = doc.data();

        grid.innerHTML += `
          <div class="card">

            <img
              src="${produto.imagem}"
              alt="${produto.nome}"
            >

            <div class="card-content">

              <h3 class="card-title">
                ${produto.nome}
              </h3>

              <p>
                ${produto.descricao}
              </p>

              <div class="card-price">
                R$ ${Number(produto.preco).toFixed(2)}
              </div>

            </div>

          </div>
        `;
    });
}

carregarProdutos();