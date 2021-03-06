var express = require('express');

var app = express();

app.use(express.bodyParser());
app.use(express.logger());
app.use(express.static(__dirname + "/public"));

app.get('*', function(req, res) {
  res.sendfile('index.html');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
