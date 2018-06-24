/**
 * 该文件主要是用于实现http请求的代理，这部分功能还需要完善，还没有完成转发等映射功能
 * @type {Object}
 */
var http = require('http');
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

http.createServer()
    .on('request', request)
    .on('connect', connect)
    .listen(8888, '0.0.0.0');