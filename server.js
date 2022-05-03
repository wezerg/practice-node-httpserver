const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
    try {
        if (req.url === "/") {
            if (req.method === "GET") {
                res.writeHead(200, {'content-type':'text/html'});
                res.write(fs.readFileSync(path.join(__dirname, "public", "pages", "index.html"), {encoding: 'utf-8'}));
                res.end();
            }
            else{
                res.writeHead(405, {'content-type':'text/html'});
                res.write(fs.readFileSync(path.join(__dirname, "public", "pages", "405.html"), {encoding: 'utf-8'}));
                res.end();
            }
        }
        else if(req.url === "/public/images/image.jpg"){
            if (req.method === "GET") {
                res.writeHead(200, {'content-type':'image/jpg'});
                fs.readFile(path.join(__dirname, "public", "images", "image.jpg"), function(err, data){
                    res.end(data);
                });
            }
        }
        else if(req.url === "/public/css/style.css"){
            if (req.method === "GET") {
                res.writeHead(200, {'content-type': 'text/css'});
                fs.readFile(path.join(__dirname, "public", "css", "style.css"), function(err, data){
                    res.end(data);
                });
            }
        }
        else if(req.url === "/public/js/script.js"){
            if (req.method === "GET") {
                res.writeHead(200, {'content-type': 'text/js'});
                fs.readFile(path.join(__dirname, "public", "js", "script.js"), function(err, data){
                    res.end(data);
                });
            }
        }
        else{
            res.writeHead(404, {'content-type':'text/html'});
            res.write(fs.readFileSync(path.join(__dirname, "public", "pages", "404.html"), {encoding: 'utf-8'}));
            res.end();
        }
    } catch (error) {
        res.writeHead(500, {'content-type':'text/html'});
        res.write(fs.readFileSync(path.join(__dirname, "public", "pages", "500.html"), {encoding: 'utf-8'}));
        res.end();
    }
});

server.listen(3000)