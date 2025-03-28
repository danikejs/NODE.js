const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

const carrosPath = path.join(__dirname, 'carros.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function salvarDados(carros) {
    fs.writeFileSync(carrosPath, JSON.stringify(carros, null, 2));
}

app.get('/atualizar-carros', (req, res) => {
    res.sendFile(path.join(__dirname, 'atualizarCarros.html'));
});

app.post('/atualizar-carros', (req, res) => {
    const { nome, novaDescricao, novaUrlInfo, novaUrlFoto, novaUrlVideo } = req.body;
    let carrosData = fs.readFileSync(carrosPath, 'utf-8');
    let carros = JSON.parse(carrosData);

    const carrosIndex = carros.findIdex(carro => carro.nome.toLowerCase() === nome.toLowerCase());
    if (carrosIndex === -1) {
        res.send('<h1>Carros nao encontrado</h1>');
        return;
    }

    carros[carrosIndex].desc = novaDescricao;
    carros[carrosIndex].url_info = novaUrlInfo;
    carros[carrosIndex].url_foto = novaUrlFoto;
    carros[carrosIndex].url_video = novaUrlVideo;

    salvarDados(carros);
    res.send('<h1>Dados do carro atualizado com sucesso!</h1>');
});

app.listen(port, () => {
    console.log(`srv em http://localhost:${port}/atualizar-carros`);
});