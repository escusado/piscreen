const Exec = require('child_process').exec;
const Opc = new require('../opc');
const Chroma = require('chroma-js');
const EventEmitter = require('events').EventEmitter;

const FRAMERATE = 30;
const WIDTH = 24;
const HEIGHT = 16;

module.exports = class Engine extends EventEmitter {
  setup () {

    this.framerate = FRAMERATE;
    this.width = WIDTH;
    this.height = HEIGHT;
    this.pixelCount = this.width * this.height;

    this.scene = []; //24x16=384
    this.fadeCandyClient = new Opc('localhost', 7890);
    this.startScreen();
  }

  startScreen () {
    Exec('echo dale pal piso! && fcserver /usr/src/app/fcserver-config.json')/*.stdout.pipe(process.stdout*/);
    this.scene = Array.apply(null, Array(this.pixelCount)).map(String.prototype.valueOf,'#000000');
  }

  update () {
    const time = new Date().getTime();
    this.emit('update', {time});
    this.drawScene();
    setTimeout(this.update.bind(this), this.framerate);
  }

  drawScene () {
    for (let pixel = 0; pixel < this.pixelCount; pixel++) {
      const [r, g, b] = Chroma(this.scene[pixel]).rgb();
      this.fadeCandyClient.setPixel(pixel, r, g, b);
    }
    this.fadeCandyClient.writePixels();
  }

}
