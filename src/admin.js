import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("add-product-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  await addDoc(
    collection(db, "produtos"),
    {
      nome: nome.value,
      categoria: categoria.value,
      preco: Number(preco.value),
      descricao: descricao.value,
      destaque: destaque.checked
    }
  );

  alert("Produto cadastrado!");
});