RedisSMQ = require("rsmq");
rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq"} );
// rsmq.createQueue({qname:"myqueue"}, function (err, resp) {
//     if (resp===1) {
//         console.log("queue created")
//     }
// });

var RSMQWorker = require( "rsmq-worker" );
var worker = new RSMQWorker( "tomi" ,{interval:.1});
worker.on( "message", function( message, next, msgid ){
        if(message){
            console.log(message);
        }
    next();
});
worker.start();



// var redis = require('redis');
// const subscribe = redis.createClient(6379, "127.0.0.1"); 
// subscribe.subscribe('rsmq:rt:tomi');
// subscribe.on('message', function(msg) {
//     rsmq.popMessage({qname: "tomi"}, function (err, resp) {
//         if (resp) {
//             console.log(resp);
//         }
//     });
// });

// pop
// for(var a = 0; a < 1; a++) {
//     // rsmq.popMessage({qname:"myqueue"}, function (err, resp) {
//     //     if (resp.id) {
//     //         console.log("Message received.", resp)	
//     //     }
//     //     else {
//     //         console.log("No messages for me...")
//     //     }
//     // });
//     rsmq.receiveMessageAsync({qname:"myqueue"}).then(function (resp) {
//         if (resp.id) {
//             console.log("Message received.", resp)	
//         }
//         else {
//             console.log("No messages for me...")
//         }
//     });
// }

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