const http = require('http');

const server = http.createServer((req, res) =>{
    //rota inicial
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type':'text/plain' });
        res.end('Bem-vindo ao meu srv Node');
    }
    //clientes  
    else if(res.url === '/cliente'){
        res.writeHead(200, { 'Content-Type':'text/plain' });
        res.end('clientes');
    }

    else if (req.url ==='/cliente1') {
        res.writeHead(200, {'content-type':'text/plain'});
        res.end('alunos.');
   }

    else if(res.url === '/fornecedor'){
        res.writeHead(200,{ 'Content-Type':'text/plain' });
        res.end('fornecedor');
    }

    else if(res.url === '/produto'){
        res.writeHead(200, { 'Content-Type':'text/plain' });
        res.end('produtos');
    }

    else if(res.url ==='/venda'){
        res.writeHead(200, { 'Content-Type':'text/plain' });
        res.end('vendas');
    }

    else if(res.url === '/vendedor'){
        res.writeHead(200, { 'Content-Type':'text/plain' });
        res.end('vendedores');
    }

    else{
        res.writeHead(404,{'content-type':'text/plain'});
        res.end('rota não encontrada!');
       }
});

const port = 10000;

server.listen(port,() => {
    console.log(`servidor rodando em http://localhost:${port}/`);       
})