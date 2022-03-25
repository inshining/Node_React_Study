const http = require('http');
// const http2 = require('http2');

const server = http.createServer((req, res) => {
    console.log('incoming..');
    console.log(req.headers);
    console.log(req.httpVersion);
    console.log(req.method);
    console.log(req.url);
    const url = req.url;
    if (url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html></html>')
        res.write('<head><title>Welcome</title></head>')
        res.write('<body><h1>Welcome! Hello world!</h1></body>')
    } else if (url === '/courses'){
        res.write('Courses');
    } else{
        res.write('Not Found');
    }

    res.end();


});

server.listen(8080);