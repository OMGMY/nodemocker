/**
 * 该文件主要是用于实现https请求的代理，这部分功能还需要完善，还要完成证书相关的功能，todo
 * @type {Object}
 */
var http = require('http');
var https = require('https');
var fs = require('fs');
var net = require('net');
var url = require('url');

function request(cReq, cRes) {
    var u = url.parse(cReq.url);

    var options = {
        hostname : u.hostname,
        port     : u.port || 80,
        path     : u.path,
        method     : cReq.method,
        headers     : cReq.headers
    };

    var pReq = http.request(options, function(pRes) {
        cRes.writeHead(pRes.statusCode, pRes.headers);
        pRes.pipe(cRes);
    }).on('error', function(e) {
        cRes.end();
    });

    cReq.pipe(pReq);
}

function connect(cReq, cSock) {
    var u = url.parse('http://' + cReq.url);

    var pSock = net.connect(u.port, u.hostname, function() {
        cSock.write('HTTP/1.1 200 Connection Establishedrnrn');
        pSock.pipe(cSock);
    }).on('error', function(e) {
        cSock.end();
    });

    cSock.pipe(pSock);
}

var options = {
    key: fs.readFileSync('./private.pem'),
    cert: fs.readFileSync('./public.crt')
};

https.createServer(options)
    .on('request', request)
    .on('connect', connect)
    .listen(8888, '0.0.0.0');