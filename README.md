# docker-nodejs-gsm-mongodb
```
$ docker run -d \
    --name node-gsm-mongodb \
    --link mongodb:mongodb \
    --link rabbitmq:rabbitmq \
    -e AMQP_URL=amqp://*username*:*password*@rabbitmq \
    -e MONGODB_URL=mongodb://mongodb:27017/gsm \
    marcelmaatkamp/nodejs-gsm-mongodb:latest
```
