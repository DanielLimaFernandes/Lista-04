import { realizarAtualizacaoExibicao } from "./app.js";

let minhaLista = [];

const novaAtualizacaoArray = (novoArray) => {
    minhaLista = novoArray;
    atualizarArmazenamentoLocal();
    realizarAtualizacaoExibicao();
}

const verificarExistencia = () => {
    if (localStorage.getItem("minhaLista") == undefined) {
        localStorage.setItem("minhaLista", JSON.stringify([]));
    }
}

const obterDoArmazenamentoLocal = () => {
    return JSON.parse(localStorage.getItem("minhaLista"))
}

const atualizarArmazenamentoLocal = () => {
    localStorage.setItem("minhaLista", JSON.stringify(minhaLista));
}

export { verificarExistencia, obterDoArmazenamentoLocal, novaAtualizacaoArray, atualizarArmazenamentoLocal, minhaLista }
