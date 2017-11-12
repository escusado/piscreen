// #!/usr/bin/env node
// Simple red/blue fade with Node and opc.js

var OPC = new require('./opc')
var client = new OPC('localhost', 7890);
const Exec = require('child_process').exec;
const Chroma = require('chroma-js');

// const colorScale = Chroma.scale(['#0000ff', '#ff0000', '#00ff00']).mode('lch').colors(Engine.pixelCount)

Exec('echo dale pal piso! && fcserver /usr/src/app/fcserver-config.json').stdout.pipe(process.stdout);

function draw() {
    var millis = new Date().getTime(),counter = 0, x=0,y=180, increase = 0.001;

    for (var pixel = 0; pixel < 512; pixel++)
    {
        var t = pixel * 0.2 + millis * 0.002;
        // var red =  96 * Math.sin(t + 0.1) + 96 * Math.sin(t);
        // var green = 128 + 96 * Math.sin(t + 0.1);
        // var blue =  96 * Math.sin(t + 0.1) + 96 * Math.sin(t + 0.3);

        // let {red,green,blue} = Chroma.hcl(Math.sin(t + 0.1), Math.sin(t + 0.2), Math.sin(t + 0.3));
        // console.log('>', red,green,blue);

        y =  180 + (Math.sin(counter) * 180);
        counter += increase;
        console.log('>>>', y);


        // console.log(y);
        //
        // var t = pixel * 0.2 + millis * 0.002;
        // var red = y;
        // var green = 128 + 96 * Math.sin(t + 0.1);
        // var blue = 128 + 96 * Math.sin(t + 0.3);

        let [red,green,blue] = Chroma(y, 1, 0.6, 'hsl').rgb();

        client.setPixel(pixel, red, green, blue);
    }
    client.writePixels();
}

setInterval(draw, 60);



// var increase = 90/180*Math.PI / 9;
// for(i=0; i<=360; i+=10){
//
//      ctx.moveTo(x,y);
//     x = i;
//     y =  180 - Math.sin(counter) * 120;
// counter += increase;
//
//     ctx.lineTo(x,y);
//     ctx.stroke();
//     //alert( " x : " + x + " y : " + y + " increase : " + counter ) ;
//
// }
