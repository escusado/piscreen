// #!/usr/bin/env node
// Simple red/blue fade with Node and opc.js
const Chroma = require('chroma-js');
var OPC = new require('./opc')
var client = new OPC('localhost', 7890);
const Exec = require('child_process').exec;

let PIXEL_COUNT = 63;

Exec('echo dale pal piso! && fcserver /usr/src/app/fcserver-config.json').stdout.pipe(process.stdout);
const colorScale = Chroma.scale(['#0000ff', '#ff0000', '#00ff00']).mode('lch').colors(PIXEL_COUNT);

function draw() {
    var millis = new Date().getTime();

    for (var pixel = 0; pixel < PIXEL_COUNT; pixel++)
    {
        var t = pixel * 0.2 + millis * 0.002;
        var red = 128 + 96 * Math.sin(t);
        var green = 128 + 96 * Math.sin(t + 0.1);
        var blue = 128 + 96 * Math.sin(t + 0.3);

        const [r, g, b] = Chroma(colorScale[pixel]).rgb();
        console.log('>>>>>', pixel, r, g, b);
        client.setPixel(pixel, r, g, b);
    }
    client.writePixels();
}

setInterval(draw, 30);
