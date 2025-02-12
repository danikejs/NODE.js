const http = require('http'); //http trabalha com requisisão e respostas

const server = http.createServer((req, res) => {
    //rota principal
    if (req.url === '/') {
        res.writeHead(200, {'content-type':'text/plain'});
        res.end('Bem-vindo ao meu srv Node');
    }

    //rota para pag aluno
    else if (req.url ==='/aluno') {
        res.writeHead(200, {'content-type':'text/plain'});
        res.end('alunos.');
   }
   //rota prof
   else if (req.url === '/professor') {
    res.writeHead(200,{'content-type':'text/plain'});
    res.end('professores.');
   }
   //rota 404 not found
   else{
    res.writeHead(404,{'content-type':'text/plain'});
    res.end('rota não encontrada!');
   }
});

const port = 3000;

server.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}/`);
})