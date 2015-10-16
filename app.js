var fs = require('fs');
var express = require('express');
var minify = require('express-minify');
var logger = require('morgan');
var favicon = require('serve-favicon');
var compress = require('compression');
var app = express();

var port = process.env.PORT || 3000;
var host = process.env.HOST || '0.0.0.0';

app.use(logger('dev'));
app.use(compress({threshold: 0}));
app.use(favicon(__dirname + '/client/img/favicon.ico'));
app.use('/', express.static(__dirname + '/dist'));
app.use(minify({
  js_match: /javascript/,
  cache: false
}));

var router = express.Router();

router
  .get('/raw.js', function(req, res) {
    var js = fs.readFileSync('./client/js/raw.js');
    res._skip = true;
    res.setHeader('Content-Type', 'application/javascript');
    res.end(js);
  })
  .get('/min.js', function(req, res) {
    var js = fs.readFileSync('./client/js/raw.js');
    res.setHeader('Content-Type', 'application/javascript');
    res.end(js);
  })
  ;

app.use('/', router);

var server = app.listen(port, host, function() {
  console.log('%s@%s listening at http://%s:%s',
    process.env.npm_package_name,
    process.env.npm_package_version,
    host,
    port
  );
});
