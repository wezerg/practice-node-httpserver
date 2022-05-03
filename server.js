const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        if (req.url === "/") {
            res.writeHead(200, {'content-type':'text/html'});
            res.write('<h1>Hello World Vivian !</h1>');
        }
    }
    res.end()
});

server.listen(3000)