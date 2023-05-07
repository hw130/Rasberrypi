const { Off } = require('./led');

const gpio = require('pigpio').Gpio;

const rled = new gpio(21, {mode: gpio.OUTPUT}); 
const bled = new gpio(16, {mode: gpio.OUTPUT}); 
const button = new gpio(20, {
    mode: gpio.INPUT,
    edge: gpio.FALLING_EDGE } );
var count = 0;
// 채터링문제 해결(Debouncing), 100ms 동안 안정화후 인터럽트 발생 button.glitchFilter(100000);
const Handler = (level, tick) => {
    button = null
    Init: (level, tick) => {
        const button = new gpio(20, {
            mode: gpio.INPUT,
            edge: gpio.FALLING_EDGE
        });
    }

    On: () => {
        console.log(++count + ' Button down ' + tick); 
    }

    Off: () => {
        console.log(++count + ' Button up ' + tick); 
    }
    if (level === 0) {
        console.log(++count + ' Button down ' + tick); 
        rled.digitalWrite(1);
        bled.digitalWrite(0);
    } else {
        console.log(++count + ' Button up ' + tick); 
        rled.digitalWrite(0);
        bled.digitalWrite(1);
} }