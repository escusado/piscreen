// #!/usr/bin/env node
// Simple red/blue fade with Node and opc.js

var OPC = new require('./opc')
var client = new OPC('localhost', 7890);
const Exec = require('child_process').exec;

Exec('echo dale pal piso! && fcserver /usr/src/app/fcserver-config.json').stdout.pipe(process.stdout);

function draw() {
    var millis = new Date().getTime();

    for (var pixel = 0; pixel < 512; pixel++)
    {
        var t = pixel * 0.2 + millis * 0.002;
        var red =  96 * Math.sin(t + 0.1) + 96 * Math.sin(t);
        var green = 128 + 96 * Math.sin(t + 0.1);
        var blue =  96 * Math.sin(t + 0.1) + 96 * Math.sin(t + 0.3);

        client.setPixel(pixel, red, green, blue);
    }
    client.writePixels();
}

setInterval(draw, 60);
