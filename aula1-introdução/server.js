const http = require('http');

const hostname = '192.168.56.1';
const port = '3000';

const meuServidor = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    res.end('simasturbo.com.br\n');
});

meuServidor.listen(port, hostname, () => {
    console.log(`servidor rodando em http://${hostname}:${port}/`)
})