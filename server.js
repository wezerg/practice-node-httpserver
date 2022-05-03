const http = require('http');
const path = require('path');
const fs = require('fs');

const db = new Map();
let id = 0;
db.set(id++, {nom: "Alice"});
db.set(id++, {nom: "Bob"});
db.set(id++, {nom: "Charlie"});

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
        else if(/public*/.test(req.url)){
            let file = req.url.split('/').filter(e => e)[1];
            let ext = file.split('.')[1];
            res.writeHead(200, {'content-type': ext === "jpg" ? "image/jpeg" : ext === "png" ? "image/png" : "text/" + ext});
            fs.readFile(path.join(__dirname, "public", ext, file), function(err, data){
                res.end(data);
            });
        }
        else if(req.url === "/api/names"){
            const json = {"users" : {}};
            json.users = Object.fromEntries(db);
            res.writeHead(200, {'content-type' : "application/json"});
            res.end(JSON.stringify(json));
        }
        else{
            res.writeHead(404, {'content-type':'text/html'});
            res.write(fs.readFileSync(path.join(__dirname, "public", "pages", "404.html"), {encoding: 'utf-8'}));
            res.end();
        }
    } catch (error) {
        console.log(error)
        res.writeHead(500, {'content-type':'text/html'});
        res.write(fs.readFileSync(path.join(__dirname, "public", "pages", "500.html"), {encoding: 'utf-8'}));
        res.end();
    }
});

server.listen(3000)