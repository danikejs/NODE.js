const fs = require('fs');
const path = require('path');
const express = require('express');
const { captureRejectionSymbol } = require('events');

const app = express();
const port = 3000;

const artigosPath = path.join(__dirname, 'artigos.json');



//filtar
const artigosData = fs.readFileSync(artigosPath, 'utf-8');
const artigos = JSON.parse(artigosData);

function buscarArtigos(nome){
    return artigos.find(artigo =>
        artigo.nome.toLowerCase() === nome.toLowerCase());
}

app.get('/buscar-artigo/:nome', (req,res) => {
    const nomeDoArtigoBuscado = req.params.nome;
    const artigoEncontrado = buscarArtigos(nomeDoArtigoBuscado);

    if(artigoEncontrado){
        res.send(`<h1>artigo encontrado:</h1><pre> ${JSON.stringify (artigoEncontrado,null,2)}</pre>`);
    } else {
        res.send('<h1>artigo não encontrado.</h1>');
    }
});

//add



app.listen(port,() =>{
    console.log(`servidor iniciado em http://localhost:${port}/buscar-artigo`);
})