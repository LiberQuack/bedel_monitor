FROM node:4
MAINTAINER 'Martins <rogue.thiago@gmail.com>'

ADD scripts       /monitor/scripts
ADD monitor.js    /monitor
ADD entrypoint.sh /monitor
ADD package.json  /monitor

WORKDIR /monitor

RUN npm install

ENTRYPOINT ["./entrypoint.sh"]