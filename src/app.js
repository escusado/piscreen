const Chroma = require('chroma-js');

module.exports = class App {
  setup () {
    this.frame = [];
    Engine.on('update', this.handledUpdate.bind(this));
    this.setupFrame();
  }

  setupFrame () {

    const colorScale = Chroma.scale(['#0000ff', '#ff0000', '#00ff00']).mode('lch').colors(Engine.pixelCount)
    let colorIndex = 0;

    for (let y=0; y<Engine.height; y++) {
      this.frame.push([]);
      for (let x=0; x<Engine.width; x++) {
        this.frame[y][x] = Chroma(colorScale[colorIndex]).darken(8).hex();
        colorIndex++;
        console.log();
      }
    }
  }

  handledUpdate (ev) {
    this.updateScene();
  }

  updateScene () {
    const scratch = [];

    for (let x=Engine.width-1; x>=0; x--) {
      for (let y=(Engine.height/2); y<Engine.height; y++) {
        scratch.push(this.frame[y][x]);
      }
    }

    for (let x=Engine.width-1; x>=0; x--) {
      for (let y=0; y<(Engine.height/2); y++) {
        scratch.push(this.frame[y][x]);
      }
    }

    Engine.scene = scratch;
  }
}
