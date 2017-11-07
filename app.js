console.log('starting app...');

var exec = require('child_process').exec;
// var coffeeProcess = exec('fcserver /usr/src/app/fcserver-config.json');
//
// coffeeProcess.stdout.on('data', function(data) {
//     console.log(data);
// });

// exec('echo watussi').stdout.pipe(process.stdout);
exec('echo dale pal piso && fcserver /usr/src/app/fcserver-config.json').stdout.pipe(process.stdout);
// exec('echo bellaquera').stdout.pipe(process.stdout);

let rpio = require('rpio');
rpio.open(11, rpio.INPUT, rpio.PULL_UP);
console.log('wattdup');
let blueCounter = 0;
function pollcb(pin)
{
        /*
         * Interrupts aren't supported by the underlying hardware, so events
         * may be missed during the 1ms poll window.  The best we can do is to
         * print the current state after a event is detected.
         */
        var blueStatus = !rpio.read(pin);

        if(blueStatus){
          console.log('>got', blueStatus, blueCounter++);
        }
}

rpio.poll(11, pollcb);
