const gpio = require('pigpio').Gpio
const buzzer = new gpio(21, {mode: INPUT})
const led = new gpio(16, {mode: OUTPUT})

let dutycycle = 0
let speed = 29

const fadeIn = () => {
    led.pwmWrite(dutycycle)
    if(dutycycle < 254){
        dutycycle += 2
        setTimeout(fadeIn, 200)
    } else{
        buzzer.digitalWrite(0)
        setTimeout(fadeOut, 200)
    }
}

const fadeOut = () => {
    led.pwmWrite(dutycycle)
    if(dutycycle > 2){
        dutycycle -= 2
        setTimeout(fadeOut, speed)
    } else {
        buzzer.digitalWrite(0)

    }
}

led.digitalWrite(0)
setImmediate(fadeOut)