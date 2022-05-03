const http = require('http');

const server = http.createServer((req, res) => {
    res.write('Hello World Vivian !');
    res.end()
});

server.listen(3000)