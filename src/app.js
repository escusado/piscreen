const Chroma = require('chroma-js');

module.exports = class App {
  setup () {
    this.frame = [];
    Engine.on('update', this.handledUpdate.bind(this));
    this.setupFrame();
  }

  setupFrame () {

    const colorScale = Chroma.scale(['#0000FF', '#FF0000', '#00FF00', '#0000FF']).mode('rgb').colors(Engine.pixelCount)
    let colorIndex = 0;
    for (let y=0; y<Engine.height; y++) {
      const currentColor = y % 2 ? 'red' : 'green';
      this.frame.push([]);
      for (let x=0; x<Engine.width; x++) {
        // this.frame[y][x] = colorScale[colorIndex];
        this.frame[y][x] = colorIndex % 7 ? 'red' : 'blue';
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
    const colorScale = Chroma.scale(['#FF0000', '#00FF00', '#0000FF']).mode('rgb').colors(Engine.pixelCount)
    // for (let x=0; x<Engine.width; x++) {
    //   for (let y=Engine.height-1; y>=0; y--) {
    //     scratch.push(colorScale[scratch.length]);
    //     console.log('>>>>', scratch.length);
    //     // scratch.push(this.frame[y][x]);
    //   }
    // }

    for (let y=0; y<Engine.height; y++) {
      for (let x=0; x<Engine.width; x++) {
        scratch.push(colorScale[scratch.length]);
        // console.log('>>>>', scratch.length);
      }
    }

    Engine.scene = scratch;
  }
}
