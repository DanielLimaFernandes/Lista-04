import { novaAtualizacaoArray, obterDoArmazenamentoLocal } from "./armazenamentoLocal.js";
import { realizarAtualizacaoExibicao } from "./app.js";

const adicionarNovoItem = (novoItem) => {
    const novoArray = [...obterDoArmazenamentoLocal(), novoItem];
    novaAtualizacaoArray(novoArray);
}

const removerItem = (hash) => {
    const novoArray = obterDoArmazenamentoLocal().filter((obj) => obj.hash !== hash);
    novaAtualizacaoArray(novoArray);
    realizarAtualizacaoExibicao();
}

const marcarItem = (hash) => {
    const items = obterDoArmazenamentoLocal();

    items.forEach((item) => {
        if (item.hash === hash) {
            item.comprado = true;
        }
    });

    novaAtualizacaoArray(items);
}

const desmarcarItem = (hash) => {
    const items = obterDoArmazenamentoLocal();

    items.forEach((item) => {
        if (item.hash === hash) {
            item.comprado = false;
        }
    });

    novaAtualizacaoArray(items);
}

const listarItens = () => {
    return obterDoArmazenamentoLocal();
}

export { adicionarNovoItem, listarItens, removerItem, marcarItem, desmarcarItem }
