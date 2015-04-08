#!/usr/bin/env nodejs
var amqp = require('amqplib');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var mongodb_url = process.env.MONGODB_URL || 'mongodb://mongodb:27017/gsm';

var mongodb = MongoClient.connect(mongodb_url, function(err, db) {
  var collection = db.collection('gsm');
  assert.equal(null, err);
  console.log("Connected successfully on " + mongodb_url);


// ---

amqp.connect('amqp://rabbitmq').then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });
  return conn.createChannel().then(function(ch) {
    var ok = ch.assertExchange('gsm', 'x-udp', {durable: true});
    ok = ok.then(function() {
      return ch.assertQueue('', {exclusive: true});
    });
    ok = ok.then(function(queue) {
      var queueName = "gsm.mongodb"
      return ch.consume(queueName, logMessage, {noAck: true});
    });
    return ok.then(function() {
      console.log(' [*] Waiting for logs. To exit press CTRL+C');
    });

    function logMessage(msg) {
      console.log(" [x] '%s'", msg.content.toString(hex));
    }
  });
}).then(null, console.warn);

// ---
})

