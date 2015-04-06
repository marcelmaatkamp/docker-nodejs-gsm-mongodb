# docker-nodejs-dns-mongodb
```
$ docker run -d \
    --name node-dns-mongodb \
    --link mongodb:mongodb \
    --link rabbitmq:rabbitmq \
    -e AMQP_URL=amqp://*username*:*password*@rabbitmq \
    -e MONGODB_URL=mongodb://mongodb:27017/dns \
    marcelmaatkamp/nodejs-dns-mongodb:latest
```
