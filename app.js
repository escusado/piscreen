// var  ledToggle, pressCount;
// //provision the gpio pins 22 for the led output and 17 for the button input
// var led= require("pi-pins").connect(22),
//     button = require("pi-pins").connect(17);
//
// //set the pin mode,  setting pin 22 as an output and 17 as an input
// button.mode('in');
// led.mode('out');
//
// //set the initial value of the LED to be off.
// ledToggle = false;
// pressCount= 0;
// led.value(true);
//
// //look for a button press event and switch on the LED for 2 seconds when this happens.
// button.on('rise', function () {
//     console.log("button pressed: "+ (++pressCount) +" time(s)");
//     ledToggle = !ledToggle;
//     led.value(ledToggle);
// });


var rpio = require('rpio');

console.log('app started button away!');


// rpio.open(11, rpio.INPUT);
//
// var checkFn = function(){
//   console.log('Pin 11 is currently set ' + (rpio.read(11) ? 'high' : 'low'));
//   checkTimeout = setTimeout(checkFn, 1000);
// }
//
// var checkTimeout = setTimeout(checkFn, 1000);


rpio.open(11, rpio.INPUT, rpio.PULL_DOWN);

function pollcb(pin)
{
        /*
         * Interrupts aren't supported by the underlying hardware, so events
         * may be missed during the 1ms poll window.  The best we can do is to
         * print the current state after a event is detected.
         */
        var state = rpio.read(pin) ? 'pressed' : 'released';
        console.log('Button event on P%d (button currently %s)', pin, state);
}

rpio.poll(15, pollcb);
