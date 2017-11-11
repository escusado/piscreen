const Chroma = require('chroma-js');

module.exports = class App {
  setup () {
    this.frame = [];
    Engine.on('update', this.handledUpdate.bind(this));
    this.setupFrame();
  }

  setupFrame () {

    const colorScale = Chroma.scale(['#FF0000', '#00FF00', '#00FF00']).mode('lch').colors(Engine.pixelCount)

    for (let y=0; y<Engine.height; y++) {
      const currentColor = y % 2 ? 'red' : 'green';
      this.frame.push([]);
      for (let x=0; x<Engine.width; x++) {
        console.log('>>', colorScale[x*y]);
        this.frame[y][x] = colorScale[x*y];
      }
    }
  }

  handledUpdate (ev) {
    this.updateScene();
  }

  updateScene () {
    const scratch = [];

    for (let x=0; x<Engine.width; x++) {
      for (let y=Engine.height-1; y>=0; y--) {
        scratch.push(this.frame[y][x]);
      }
    }

    Engine.scene = scratch;
  }
}
