import { db } from "./firebase.js";

import {
  collection,
  getDocs
} from "firebase/firestore";

const grid = document.getElementById("produtos-grid");

async function carregarProdutos() {

  try {

    const querySnapshot = await getDocs(
      collection(db, "produtos")
    );

    grid.innerHTML = "";

    querySnapshot.forEach((doc) => {

      const produto = doc.data();

      grid.innerHTML += `
        <div class="card">
          <div class="card-content">

            <h3 class="card-title">
              ${produto.nome}
            </h3>

            <p>
              ${produto.descricao}
            </p>

            <div class="card-price">
              R$ ${produto.preco.toFixed(2)}
            </div>

          </div>
        </div>
      `;
    });

  } catch (erro) {
    console.error(erro);
  }
}

carregarProdutos();