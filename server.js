//var http = require('http');
//var fs = require('fs');
//var contentTypesByExtension = {
//    'html': "text/html",
//    'js':   "text/javascript",
//    'css':"text/css"
//};
//var contentType = contentTypesByExtension[fileExtension] || 'text/plain';
//var index = fs.readFileSync('estimator.html');
//
//http.createServer(function (req, res) {
//  res.writeHead(200, {'Content-Type': 'text/html'});
//  res.end(index);
//}).listen(9615);


var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(9615);