const Chroma = require('chroma-js');

module.exports = class App {
  setup () {
    this.frame = [];
    Engine.on('update', this.handledUpdate.bind(this));
    this.setupFrame();
  }

  setupFrame () {

    const colorScale = Chroma.scale(['#000022', '#220000', '#002200']).mode('rgb').colors(Engine.pixelCount)
    let colorIndex = 0;
    for (let y=0; y<Engine.height; y++) {
      // const currentColor = y % 2 ? 'red' : 'green';
      this.frame.push([]);
      for (let x=0; x<Engine.width; x++) {
        // this.frame[y][x] = colorScale[colorIndex];

        //borders
        this.frame[y][x] = y===0 || x===0 || y===(Engine.height-1) || x===(Engine.width-1) ? '#222' : colorScale[colorIndex];
        this.frame[y][x] = y===0 && x===0 ? 'red' : this.frame[y][x];
        this.frame[y][x] = y===(Engine.height-1) && x===(Engine.width-1) ? 'blue' : this.frame[y][x];
        this.frame[y][x] = y===0 && x===(Engine.width-1) ? 'green' : this.frame[y][x];
        this.frame[y][x] = y===(Engine.height-1) && x===0 ? 'magenta' : this.frame[y][x];

        this.frame[y][x] = (x%8>0) || (y%8>0) ? 'black' : this.frame[y][x];

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
    // const colorScale = Chroma.scale(['#FF0000', '#00FF00', '#0000FF']).mode('rgb').colors(Engine.pixelCount)
    // for (let x=0; x<Engine.width; x++) {
    //   for (let y=Engine.height-1; y>=0; y--) {
    //     // scratch.push(colorScale[scratch.length]);
    //     // console.log('>>>>', scratch.length);
    //     scratch.push(this.frame[y][x]);
    //   }
    // }

    for (let y=0; y<Engine.height; y++) {
      for (let x=0; x<Engine.width; x++) {
        scratch.push(this.frame[y][x]);
        // console.log('>>>>', scratch.length);
      }
    }

    // //first half
    // console.log('asdf', Engine.height);
    // for (let x=Engine.width-1; x>=0; x--) {
    //
    //   if(x%2>0){
    //     for (let y=0; y<(Engine.height/2); y++) {
    //       // scratch.push(colorScale[scratch.length]);
    //       console.log('>>>>', y, x, this.frame[y][x], scratch.length);
    //       // console.log( scratch.length);
    //       scratch.push(this.frame[y][x]);
    //     }
    //   }else{
    //     for (let y=(Engine.height/2)-1; y>=0; y--) {
    //       // scratch.push(colorScale[scratch.length]);
    //       console.log('>>>>', y, x, this.frame[y][x], scratch.length);
    //       // console.log( scratch.length);
    //       scratch.push(this.frame[y][x]);
    //     }
    //   }
    // }
    // console.log('\n\n===============\n\n');
    // for (let x=Engine.width-1; x>=0; x--) {
    //
    //   if(x%2>0){
    //     for (let y=(Engine.height/2); y<Engine.height; y++) {
    //       // scratch.push(colorScale[scratch.length]);
    //       console.log('>>>>', y, x, this.frame[y][x], scratch.length);
    //       // console.log( scratch.length);
    //       scratch.push(this.frame[y][x]);
    //     }
    //   }else{
    //     for (let y=(Engine.height-1); y>=(Engine.height/2); y--) {
    //       // scratch.push(colorScale[scratch.length]);
    //       console.log('>>>>', y, x, this.frame[y][x], scratch.length);
    //       // console.log( scratch.length);
    //       scratch.push(this.frame[y][x]);
    //     }
    //   }
    // }

    // // console.log('\n\n=========================\n\n');
    // for (let x=Engine.width-1; x>=0; x--) {
      // for (let y=0; y<(Engine.height/2)-1; y++) {
      //   // scratch.push(colorScale[scratch.length]);
      //   console.log('>>>>', y, x, this.frame[y][x], scratch.length);
      //   // console.log( scratch.length);
      //   scratch.push(this.frame[y][x]);
      // }
    // }

    Engine.scene = scratch;
  }
}
