console.log('startin app...');

let rpio = require('rpio');


// /usr/local/bin/fcserver /usr/src/app/fcserver-config.json > /var/log/fcserver.log 2>&1 &

let child = require('child_process').exec('/usr/local/bin/fcserver /usr/src/app/fcserver-config.json', [], function(err, stdout, stderr) {
    console.log(stdout);
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
