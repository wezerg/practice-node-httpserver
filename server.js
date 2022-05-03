const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        if (req.method === "GET") {
            res.writeHead(200, {'content-type':'text/html'});
            res.write('<h1>Hello World Vivian !</h1>');
        }
    }
    res.end()
});

server.listen(3000)