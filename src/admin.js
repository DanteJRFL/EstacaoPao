import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "firebase/firestore";

const form = document.getElementById("add-product-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {

    await addDoc(collection(db, "produtos"), {
      nome: document.getElementById("nome").value,
      categoria: document.getElementById("categoria").value,
      descricao: document.getElementById("descricao").value,
      preco: Number(document.getElementById("preco").value),
      destaque: document.getElementById("destaque").checked
    });

    alert("Produto cadastrado!");

    form.reset();

  } catch (erro) {
    console.error(erro);
    alert("Erro ao cadastrar produto");
  }
});