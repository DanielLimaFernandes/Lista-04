import { verificarExistencia, obterDoArmazenamentoLocal } from "./armazenamentoLocal.js";
import { adicionarNovoItem, listarItens, removerItem, marcarItem, desmarcarItem } from "./lista04.js";

// Variáveis da página web
const inputNomeProduto = document.querySelector("#nome-do-item");
const inputPrecoItem = document.querySelector("#preco-do-item");
const inputCodigoBarras = document.querySelector("#codigoBarras");
const outputDados = document.querySelector("#saidaDados");

// Formulário que dispara o evento
const form = document.querySelector("#sessao");

// Adicionando uma nova lista caso ela não exista no módulo armazenamentoLocal.js
verificarExistencia();

// Classe responsável por criar meus objetos e adicioná-los à lista
class ItemDeCompra {
    constructor(nome, preco, codigoBarras, comprado, hash) {
        this.nome = nome;
        this.preco = preco;
        this.codigoBarras = codigoBarras;
        this.comprado = comprado;
        this.hash = hash;
    }
}

// Gerando um tipo de "hash", como um identificador
const gerarHash = () => {
    const caracteres = "abcdefghijklmnopqrstuvwxyz0123456789";
    let novoHash = "cha";

    for (let i = 0; i < 5; i++) {
        novoHash += caracteres[Math.floor(Math.random() * caracteres.length)];
    }

    return novoHash;
}

// Controlando o índice para adicionar os eventos de clique de forma mais segura
const controlarIndice = (hash) => {
    for (let i in obterDoArmazenamentoLocal()) {
        if (obterDoArmazenamentoLocal()[i].hash === hash) {
            return i;
        }
    }
}

// Gerando uma nova linha na tabela
const gerarLinha = ({ nome, preco, codigoBarras, hash, comprado }) => {
    const meuHtml = `
        <td class="${comprado ? "comprei" : ""}" >${nome}</td>
        <td class="${comprado ? "comprei" : ""}">R$ ${preco}</td>
        <td class="${comprado ? "comprei" : ""}">${codigoBarras}</td>
        <td><input type="checkbox" name="${hash}" class="mycheck"> <span class="${comprado ? "check" : "no-check"}"></span> </td>
        <td class="remove-bottom">Remover</td>`;

    // Criando nova tag HTML "tr"
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = meuHtml;

    outputDados.appendChild(novaLinha);
    const eventoRemover = document.querySelectorAll(".remove-bottom")[controlarIndice(hash)];
    const eventoMarcarDesmarcar = document.querySelectorAll(".mycheck")[controlarIndice(hash)];

    // Adicionando evento de clique a todos os botões de checkbox
    eventoMarcarDesmarcar.addEventListener("click", () => {
        console.log(comprado)
        comprado ? desmarcarItem(hash) : marcarItem(hash);
    });

    // Adicionando evento de clique a todos os botões de remoção
    eventoRemover.addEventListener("click", () => {
        removerItem(hash);
    });
}

const realizarAtualizacaoExibicao = () => {
    outputDados.textContent = "";
    for (let item of listarItens()) {
        gerarLinha(item);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    adicionarNovoItem(new ItemDeCompra(inputNomeProduto.value, parseInt(inputPrecoItem.value), inputCodigoBarras.value, false, gerarHash()))

    // Para fins de experiência do usuário
    inputNomeProduto.value = "";
    inputPrecoItem.value = "";
    inputCodigoBarras.value = "";
    inputNomeProduto.focus();

    realizarAtualizacaoExibicao();
})

realizarAtualizacaoExibicao();

export { realizarAtualizacaoExibicao }
