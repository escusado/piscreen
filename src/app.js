module.exports = class App {
  setup () {
    this.frame = [];
    Engine.on('update', this.handledUpdate.bind(this));
    this.setupFrame();
  }

  setupFrame () {
    for (let y=0; y<Engine.height; y++) {
      const currentColor = n % 2 ? 'red' : 'blue';
      for (let x=0; x<Engine.width; x++) {
        this.frame[x][y] = currentColor;
      }
    }
  }

  handledUpdate (ev) {
    this.updateScene();
  }

  updateScene () {
    const scratch = [];
    for (let y=0; y<Engine.height; y++) {
      for (let x=0; x<Engine.width; x++) {
        scratch.push(this.frame[x][y]);
      }
    }
    Engine.scene = scratch;
  }
}
