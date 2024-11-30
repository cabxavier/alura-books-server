const fs = require("fs");

function getTodosLivros() {
    return JSON.parse(fs.readFileSync("livros.json"));
}

function getLivroPorId(id) {
    return JSON.parse(fs.readFileSync("livros.json")).filter(livro => livro.id === id)[0];
}

function insereLivro(livroNovo) {
    fs.writeFileSync("livros.json", JSON.stringify([...JSON.parse(fs.readFileSync("livros.json")), livroNovo]));
}

function modificaLivro(id, modificacoes) {
    let livrosAtuais = JSON.parse(fs.readFileSync("livros.json"));
    const indiceModificado = livrosAtuais.findIndex(livro => livro.id === id);
    const conteudoMudado = { ...livrosAtuais[indiceModificado], ...modificacoes };
    livrosAtuais[indiceModificado] = conteudoMudado;
    fs.writeFileSync("livros.json", JSON.stringify(livrosAtuais));
}

function deletaLivroPorId(id) {
    fs.writeFileSync("livros.json", JSON.stringify(JSON.parse(fs.readFileSync("livros.json")).filter(livro => livro.id !== id)));
}

module.exports = { getTodosLivros, getLivroPorId, insereLivro, modificaLivro, deletaLivroPorId }