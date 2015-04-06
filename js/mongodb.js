var amqp = require('amqp')

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var mongodb_url = process.env.MONGODB_URL || 'mongodb://localhost:27017/myproject';

var mongodb = MongoClient.connect(mongodb_url, function(err, db) {
  var collection = db.collection('dns');
  assert.equal(null, err);
  console.log("Connected successfully on " + mongodb_url);
  var rabbitmq_url = process.env.AMQP_URL || "amqp://localhost"
  var conn = amqp.createConnection({ url: rabbitmq_url }, {
    reconnect: true,
    reconnectBackoffStrategy: 'linear',
    reconnectBackoffTime: 500,
    defaultExchangeName: "dns"
  })
  conn.on('ready', function() { 
    console.log("connected on " + rabbitmq_url)
    var exchange = conn.exchange('gsm');
    conn.queue('gsm_mongodb', { durable: true }, function(queue) {
      queue.bind(exchange, 'dns')
      queue.subscribe(function(msg) {
        collection.insert(msg, function(err, result) {
          assert.equal(null, err);
        });
      });
    })
  })
})
