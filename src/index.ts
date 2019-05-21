import * as express from 'express';
var app = express();
import *  as expressWs from 'express-ws';
var ex = expressWs(app);

import * as RedisSMQ from 'rsmq';
import { MessageController } from './mw/MessageController';
import { Message } from './model/Message';
var rsmq = new RedisSMQ( {host: "127.0.0.1", port: 6379, ns: "rsmq", realtime: true} );
var messageController = new MessageController(rsmq);

app.get('/send', (req, res, next) => {
  messageController.sendMessage(new Message({to: req.query['to'], from: req.query['from'], message: req.query['message'], num: undefined})).then(x => {
    res.end('ok');
  }).catch((x) => {
    res.end('nok' + x);
  });
});

app.get('/get', (req, res, next) => {
  messageController.getMessage(req.query['name']).then(x => {
    res.json(x);
  }).catch(x => {
    res.end('nok ' + x);
  });
});

app.get('/del', (req, res, next) => {
  messageController.deleteMessage(req.query['name'], req.query['id']).then((x) => {
    if (x === 1) {
      res.end('ok');
    }
    throw 'Not deleted';
  }).catch((x) => {
    res.end('nok ' + x);
  });
});

app['ws']('/:name', (ws, req) => {
    ws.on('message', (msg) => {
      messageController.sendMessage(new Message(JSON.parse(msg))).then((x) => {
        console.log('ok');
      }).catch((x) => {
        console.log('err');
      });
    });
    const interval = setInterval(async () => {
      const msg = await messageController.getMessage(req.params.name);
      if (msg.id) {
        ws.send(msg.message);
      }
    }, 100);
    ws.on('close', () => {
      console.log('closed');
      clearInterval(interval);
    });
});

app.listen(4201);
