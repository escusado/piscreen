module.exports = class App {
  setup () {
    this.frame = [];
    Engine.on('update', this.handledUpdate.bind(this));
    this.setupFrame();
  }

  setupFrame () {
    for (let y=0; y<Engine.height; y++) {
      const currentColor = y % 2 ? 'blue' : 'green';
      this.frame.push([]);
      for (let x=0; x<Engine.width; x++) {
        this.frame[y][x] = currentColor;
      }
    }
  }

  handledUpdate (ev) {
    this.updateScene();
  }

  updateScene () {
    const scratch = [];
    // for (let y=0; y<Engine.height; y++) {
    //   for (let x=0; x<Engine.width; x++) {
    //     scratch.push(this.frame[y][x]);
    //   }
    // }

    for (let x=0; x<Engine.width; x++) {
      for (let y=Engine.height-1; y>=0; y--) {
        scratch.push(this.frame[y][x]);
      }
    }

    Engine.scene = scratch;
  }
}
