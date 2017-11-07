FROM resin/raspberrypi3-alpine-node:6-slim

RUN apk update && \
    apk upgrade && \
    apk add \
        g++ \
        gcc \
        git \
        make \
        cmake \
        autoconf \
        automake \
        libtool \
        python \
        sudo

WORKDIR /usr/src/
RUN git clone git://github.com/scanlime/fadecandy
RUN cp /usr/src/fadecandy/bin/fcserver-rpi /usr/src/app
RUN rm -rf /usr/src/fadecandy/

WORKDIR /usr/src/app
COPY . ./

RUN JOBS=MAX npm install --production --unsafe-perm && npm cache clean && rm -rf /tmp/*
COPY . ./

ENV INITSYSTEM on
RUN cat >/etc/udev/rules.d/20-gpiomem.rules <<EOF

CMD ["/usr/src/app/fcserver-rpi /usr/src/app/fcserver-config.json >/var/log/fcserver.log &","npm", "start"]
