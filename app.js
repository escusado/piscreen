console.log('starting app...');

let rpio = require('rpio');

const { spawn } = require('child_process');
const child = spawn('fcserver /usr/src/app/fcserver-config.json');

child.stdout.on('data', (data) => {
  console.log(`child stdout:\n${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`child stderr:\n${data}`);
});


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
