var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);


app.use(function (req, res, next) {
    console.log('cs')
    req.tomi = 'asd';
    return next();
});
 
app.get('/', function(req, res, next){
  console.log(req.tomi);

  res.end();
});
 
app.ws('/', function(ws, req) {
  ws.on('message', function(msg) {
    console.log(req.tomi);
  });
});
 
function onMessage(msg) {

}

app.listen(4200);