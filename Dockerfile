FROM resin/raspberrypi3-node:6-slim

RUN apt-get update && apt-get install -y \
      g++ \
      gcc \
      git \
      make \
      cmake \
      autoconf \
      automake \
      libtool \
      python \
      sudo \
      build-essential \
      libcairo2-dev \
      libjpeg8-dev \
      libpango1.0-dev \
      libgif-dev 



# Defines our working directory in container
WORKDIR /usr/src/

# Copies the package.json first for better cache on later pushes
# COPY . ./
#
# # This install npm dependencies on the resin.io build server,
# # making sure to clean up the artifacts it creates in order to reduce the image size.
# RUN JOBS=MAX npm install --production --unsafe-perm && npm cache clean && rm -rf /tmp/*
#
# COPY . ./
# This will copy all files in our root to the working  directory in the container

RUN git clone git://github.com/escusado/piscreen && \
    mv piscreen app && \
    cd app && \
    git pull && \
    npm install


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

WORKDIR /usr/src/app
RUN cp /usr/src/fadecandy/examples/node/opc.js /usr/src/app
RUN rm -rf /usr/src/fadecandy

CMD ["npm", "start"]
