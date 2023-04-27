const gpio = require('pigpio').Gpio
const button = new gpio(21, {mode: gpio.INPUT})
const rled = new gpio(21, {mode: gpio.OUTPUT})
const bled = new gpio(16, {mode: OUTPUT})
const button02 = new gpio(20,{
    mode: INPUT,
    edge: EITHER_EDGE, FALLING_EDGE, RISING_EDGE
})
var count = 0;

button.glitchFilter(1000);

const checkButton = (level, tick) => {
    data = button.digitalRead()
    if(!data){
        if((count++) % 2 == 0){

        }
    }
    if(level == 0){

    }
}
button.on('interrupt', checkButton)