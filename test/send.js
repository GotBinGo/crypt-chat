

rsmq.createQueue({qname:"myqueue"}, function (err, resp) {
    if (resp===1) {
        console.log("queue created")
    }
});

for(var a = 0; a < 3; a++) {
    rsmq.sendMessage({qname:"myqueue", message:"msg: " + a}, function (err, resp) {
        if (resp) {
            console.log("msg: a", resp);
        }
});
}
// var express = require('express');
// var app = express();
// var expressWs = require('express-ws')(app);

// var Queue = require('better-queue');
 
// app.use(function (req, res, next) {
//   return next();
// });
 
// app.get('/', function(req, res, next){
//   res.end();
// });
 
// app.ws('/', function(ws, req) {
//   ws.on('message', function(msg) {
//     var cmd = JSON.parse(msg);
//     console.log(cmd.a);
//   });
// });
 
// app.listen(3000);