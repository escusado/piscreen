const AppClass = require('./src/app.js');
const EngineClass = require('./src/engine.js');

console.log('Piscreen Booting...');
global.Engine = new EngineClass();
Engine.setup();
global.App = new AppClass();
console.log('Piscreen Starting...');
Engine.update();//kickstart
