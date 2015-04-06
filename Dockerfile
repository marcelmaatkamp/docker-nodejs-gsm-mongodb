FROM dockerfile/nodejs
MAINTAINER m.maatkamp@gmail.com version: 0.1

# ---
# add libraries

RUN npm install mongodb 
RUN npm install amqp
RUN npm install -g node-gyp
RUN npm install bson
RUN \cp -f node_modules/bson/ext/index.js node_modules/bson/ext/index.js.orig; cat node_modules/bson/ext/index.js | sed -e 's/..\/build\/Release\/bson/bson/g' | > node_modules/bson/ext/index.js.bak; mv -f node_modules/bson/ext/index.js.bak node_modules/bson/ext/index.js

# ---
# add sources 

ADD js data

ENTRYPOINT      ["node", "mongodb.js"]
