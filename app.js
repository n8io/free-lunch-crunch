var fs = require('fs');
var express = require('express');
var minify = require('express-minify');
var morgan = require('morgan');
var compress = require('compression');
var app = express();

var port = process.env.PORT || 3000;
var host = process.env.HOST || '0.0.0.0';

app.use(compress());
app.use(minify({
  js_match: /javascript/,
  cache: false
}));
app.use(morgan('dev'));

app.get('/raw.js', function(req, res) {
  var js = fs.readFileSync('./raw.js');
  res._skip = true;
  res.setHeader('Content-Type', 'application/javascript');
  res.end(js);
});

app.get('/min.js', function(req, res) {
  var js = fs.readFileSync('./raw.js');
  res.setHeader('Content-Type', 'application/javascript');
  res.end(js);
});

var server = app.listen(port, host, function() {
  console.log('%s@%s listening at http://%s:%s',
    process.env.npm_package_name,
    process.env.npm_package_version,
    host,
    port
  );
});
