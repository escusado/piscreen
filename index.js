const AppClass = require('./src/app.js');
const EngineClass = require('./src/engine.js');

console.log('Piscreen Booting...');
global.Engine = new EngineClass();
Engine.setup();
global.App = new AppClass();
console.log('Piscreen Starting...');
App.setup();
Engine.update();//kickstart
console.log('Piscreen Started...');
