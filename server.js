const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    try {
        if (req.url === "/") {
            if (req.method === "GET") {
                res.writeHead(200, {'content-type':'text/html'});
                res.write(fs.readFileSync(path.join(__dirname, "public", "pages", "index.html"), {encoding: 'utf-8'}));
            }
            else{
                res.writeHead(405, {'content-type':'text/html'});
                res.write(fs.readFileSync(path.join(__dirname, "public", "pages", "405.html"), {encoding: 'utf-8'}));
            }
        }
        else{
            res.writeHead(404, {'content-type':'text/html'});
            res.write(fs.readFileSync(path.join(__dirname, "public", "pages", "404.html"), {encoding: 'utf-8'}));
        }
    } catch (error) {
        res.writeHead(500, {'content-type':'text/html'});
        res.write(fs.readFileSync(path.join(__dirname, "public", "pages", "500.html"), {encoding: 'utf-8'}));
    }
    res.end()
});

server.listen(3000)