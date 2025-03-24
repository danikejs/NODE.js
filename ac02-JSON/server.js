const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;
const artigosPath = path.join(__dirname, 'artigos.json');

//filtrar nome 

const artigosData = fs.readFileSync(artigosPath, 'utf-8');
const artigos = JSON.parse(artigosData);

function buscarArtigos(nome) {
    return artigos.find(artigo =>
        artigo.nome.toLowerCase() === nome.toLowerCase());
}

app.get('/buscar-artigo/:nome', (req, res) => {
    const nomeDoArtigoBuscado = req.params.nome;
    const artigoEncontrado = buscarArtigos(nomeDoArtigoBuscado);

    if (artigoEncontrado) {
        res.send(`<h1>artigo encontrado:</h1><pre> ${JSON.stringify(artigoEncontrado, null, 2)}</pre>`);
    } else {
        res.send('<h1>artigo não encontrado.</h1>');
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

    if (artigos.find(artigos => artigos.nome.toLowerCase() === NovoArtigo.nome.toLowerCase())) {
        res.send('<h1>Artigo ja existe</h1>');
        return;
    }

    artigos.push(NovoArtigo);

    salvarDados();
    res.send('<h1>artigos add com sucesso</h1>');
});


//home 
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

app.listen(port, () => {
    console.log(`servidor iniciado em http://localhost:${port}/home`);
})