const http = require('http');

const server = http.createServer((req, res) => {
    try {
        if (req.url === "/") {
            if (req.method === "GET") {
                res.writeHead(200, {'content-type':'text/html'});
                res.write('<h1>Hello World Vivian !</h1>');
            }
            else{
                res.writeHead(405, {'content-type':'text/html'});
                res.write('<h1>405 : Méthode non authorisée !</h1>');
            }
        }
        else{
            res.writeHead(404, {'content-type':'text/html'});
            res.write('<h1>404 : Page introuvable !</h1>');
        }
    } catch (error) {
        res.writeHead(500, {'content-type':'text/html'});
        res.write('<h1>500 : Erreur interne au serveur !</h1>');
    }
    res.end()
});

server.listen(3000)