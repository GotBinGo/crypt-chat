import * as express from 'express';
var app = express();
import *  as expressWs from 'express-ws';
var ex = expressWs(app);

import * as RedisSMQ from 'rsmq';
import { MessageController } from './mw/MessageController';
import { Message } from './model/Message';
var rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq", realtime: true} );
var messageController = new MessageController(rsmq);

app.get('/send', function(req, res, next){
  messageController.sendMessage(new Message({to: req.query['to'], from: req.query['from'], message: req.query['message']})).then(x => {
    res.end('ok');
  }).catch(x => {
    res.end('nok' + x);
  })
});

app.get('/get', function(req, res, next){
  messageController.getMessage(req.query['name']).then(x => {
    res.json(x);
  }).catch(x => {
    res.end('nok ' + x);
  });
});

app.get('/del', function(req, res, next){
  messageController.deleteMessage(req.query['name'], req.query['id']).then(x => {
    if(x === 1){
      res.end('ok');
    }
    throw 'Not deleted';
  }).catch(x => {
    res.end('nok ' + x);
  });
});

app['ws']('/:name', function(ws, req) {
    ws.on('message', function(msg) {
      messageController.sendMessage(new Message(JSON.parse(msg))).then(x => {
        console.log('ok')
      }).catch(x => {
        console.log('err')
      })
    });
    var interval = setInterval(async() => {
      var msg = await messageController.getMessage(req.params.name);
      if(msg.id) {
        ws.send(msg.message);
      }
    }, 100);
    ws.on('close', function() {
      console.log('closed')
      clearInterval(interval);
    });
});

app.listen(4201);