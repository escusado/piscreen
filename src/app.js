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
      // const currentColor = y % 2 ? 'red' : 'green';
      this.frame.push([]);
      for (let x=0; x<Engine.width; x++) {
        // this.frame[y][x] = colorScale[colorIndex];

        //borders
        this.frame[y][x] = y===8 || y===7 || x===7 || x===8 || x===16 || x===15 || y===0 || x===0 || y===(Engine.height-1) || x===(Engine.width-1) ? '#222' : colorScale[colorIndex];
        // this.frame[y][x] = y===0 && x===0 ? 'red' : this.frame[y][x];
        // this.frame[y][x] = y===(Engine.height-1) && x===(Engine.width-1) ? 'blue' : this.frame[y][x];
        // this.frame[y][x] = y===0 && x===(Engine.width-1) ? 'green' : this.frame[y][x];
        // this.frame[y][x] = y===(Engine.height-1) && x===0 ? 'magenta' : this.frame[y][x];
        // this.frame[y][x] = (y===0 && x===7) || (y===0 && x===15) ? 'yellow' : this.frame[y][x];
        // this.frame[y][x] = (y===7 && x===7) || (y===7 && x===15) ? 'yellow' : this.frame[y][x];
        // this.frame[y][x] = (y===8 && x===7) || (y===8 && x===15) ? 'yellow' : this.frame[y][x];
        // this.frame[y][x] = (y===15 && x===7) || (y===15 && x===15) ? 'yellow' : this.frame[y][x];

        // this.frame[y][x] = (x%8>0) || (y%8>0) ? 'black' : this.frame[y][x];

        // this.frame[y][x] = colorIndex % 24 ? colorScale[colorIndex] : 'white';
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
