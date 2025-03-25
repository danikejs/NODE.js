const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;
const artigosPath = path.join(__dirname, 'artigos.json');

//filtrar titulo 

const artigosData = fs.readFileSync(artigosPath, 'utf-8');
const artigos = JSON.parse(artigosData);

function buscarArtigos(titulo) {
    return artigos.find(artigo =>
        artigo.titulo.toLowerCase() === titulo.toLowerCase());
}
app.get('/buscar-artigo/' , (req, res) => {
    res.send('<p>exreva na merda da url a bosta do nome do artigo fdp do caralho</p> <br> <a href="/home">voltar</a>')
})
app.get('/buscar-artigo/:titulo', (req, res) => {
    const tituloDoArtigoBuscado = req.params.titulo;
    const artigoEncontrado = buscarArtigos(tituloDoArtigoBuscado);

    if (artigoEncontrado) {
        res.send(`<h1>artigo encontrado:</h1><pre> ${JSON.stringify(artigoEncontrado, null, 2)}</pre> <br> <a href="/home">voltar</a>`);
    } else {
        res.send('<h1>artigo não encontrado.</h1> <br> <a href="/buscar-artigo/">voltar</a>');
    }
});

//filtrar todos
app.get('/todos-artigos', (req, res) => {
    res.send(artigos);
});



//cadastrar 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function salvarArtigos() {
    fs.writeFileSync(artigosPath, JSON.stringify(artigos, null, 2));
}

app.get('/adicionar-artigo', (req, res) => {
    res.sendFile(path.join(__dirname, 'addartigos.html'));
});

app.post('/adicionar-artigo', (req, res) => {
    const NovoArtigo = req.body;

    if (artigos.find(artigos => artigos.titulo.toLowerCase() === NovoArtigo.titulo.toLowerCase())) {
        res.send('<h1>Artigo ja existe</h1> <br> <a href="/adicionar-artigo">adicioar outro artigo</a>');
        return;
    }

    artigos.push(NovoArtigo);

    salvarArtigos();
    res.send('<h1>artigos add com sucesso</h1> <br> <a href="/home">voltar</a>');
});


//home 
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.listen(port, () => {
    console.log(`servidor iniciado em http://localhost:${port}/home`);
})