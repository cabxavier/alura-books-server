const fs = require("fs");
const { getTodosLivros, getLivroPorId, insereLivro, modificaLivro, deletaLivroPorId } = require("../servicos/livro");

function getLivros(req, res) {
    try {
        const livros = getTodosLivros();
        res.send(livros);
    } catch (error) {
        res.send(error.message);
        res.status(500);
    }
}

function getLivro(req, res) {
    try {
        if (Number(req.params.id)) {
            const livro = getLivroPorId(req.params.id);
            res.send(livro);
        } else {
            res.send("Id inválido");
            res.status(422);
        }
    } catch (error) {
        res.send(error.message);
        res.status(500);
    }
}

function postLivro(req, res) {
    try {
        if (!(req.body.id)) {
            res.send("O campo id não foi informado");
            res.status(422);
        } else if (!Number(req.body.id)) {
            res.send("Id inválido");
            res.status(422);
        } else if (!(req.body.nome)) {
            res.send("O campo nome não foi informado");
            res.status(422);
        } else {
            insereLivro(req.body);
            res.send("Livro inserido com sucesso");
            res.status(201);
        }
    } catch (error) {
        res.send(error.message);
        res.status(500);
    }
}

function patchLivro(req, res) {
    try {
        if (!(req.params.id)) {
            res.send("O campo id não foi informado");
            res.status(422);
        } else if (!Number(req.params.id)) {
            res.send("Id inválido");
            res.status(422);
        } else if (!Number(req.body.id)) {
            res.send("Id inválido");
            res.status(422);
        } else if (Number(req.params.id) !== Number(req.body.id)) {
            res.send("O id informado no parâmetro é diferente do id informado no campo body");
            res.status(422);
        } else if (!(req.body.nome)) {
            res.send("O campo nome não foi informado");
            res.status(422);
        } else {
            modificaLivro(req.params.id, req.body);
            res.send("Livro modificado com sucesso");
        }
    } catch (error) {
        res.send(error.message);
        res.status(500);
    }
}

function deleteLivro(req, res) {
    try {
        if (Number(req.params.id)) {
            deletaLivroPorId(req.params.id);
            res.send("Livro deletado com sucesso");
        } else {
            res.send("Id inválido");
            res.status(422);
        }
    } catch (error) {
        res.send(error.message);
        res.status(500);
    }
}

module.exports = { getLivros, getLivro, postLivro, patchLivro, deleteLivro }