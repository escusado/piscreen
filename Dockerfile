# base-image for node on any machine using a template variable,
# see more about dockerfile templates here: http://docs.resin.io/deployment/docker-templates/
# and about resin base images here: http://docs.resin.io/runtime/resin-base-images/
# Note the node:slim image doesn't have node-gyp
FROM resin/raspberrypi3-alpine-node:6-slim

# use apt-get if you need to install dependencies,
# for instance if you need ALSA sound utils, just uncomment the lines below.
#RUN apt-get update && apt-get install -yq \
#    alsa-utils libasound2-dev && \
#    apt-get clean && rm -rf /var/lib/apt/lists/*

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
        && \
    apt-get update && \
    apt-get upgrade

# Defines our working directory in container
WORKDIR /usr/src/app

# Copies the package.json first for better cache on later pushes
COPY . ./

# This install npm dependencies on the resin.io build server,
# making sure to clean up the artifacts it creates in order to reduce the image size.
RUN JOBS=MAX npm install --production --unsafe-perm && npm cache clean && rm -rf /tmp/*

COPY . ./
# This will copy all files in our root to the working  directory in the container

# Enable systemd init system in container
ENV INITSYSTEM on

RUN cat >/etc/udev/rules.d/20-gpiomem.rules <<EOF

# server.js will run when container starts up on the device


WORKDIR /usr/src/
RUN git clone git://github.com/scanlime/fadecandy && \
    cd fadecandy/server && \
    make submodules && \
    make && \
    sudo mv fcserver /usr/local/bin

CMD ["/usr/local/bin/fcserver /usr/src/app/fcserver-config.json >/var/log/fcserver.log 2>&1 &","npm", "start"]
