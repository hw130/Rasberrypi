const gpio = require('pigpio').Gpio;
const led = require('./led.js');
const button = require('./button.js');

const sonic = {
    trig: null,
    echo: null,
    trigPin: 13,
    echoPin: 6,
    distance: 0,
    sid: 0,

    init: function(trigpin = this.trigPin, echopin = echoPin) {
        trig = new gpio(trigpin, {mode: gpio.OUTPUT});
        echo = new gpio(echopin, {mode: gpio.INPUT, alert: true});
        trig.digitalWrite(0);
        led.Init(12,16,21);
    },
    enable: function(){
        console.log("초음파 활성화");
        sid = setInterval(() => {this.trig.trigger(10,1);}, 200);
    },
    disable: function(){
        if(sonic.sid){
            clearTimeout(sid);
            sonic.sid = 0;
            console.log("초음파 비활성화")
        }
    },
    detect: function(){
        let startTick, distance, diff;
            echo.on('alert', (level, tick) => {
            if(level == 1) {startTick = tick;}
            else {
                const endTick = tick;
                diff = endTick - startTick;
                if(distance < 400){
                    console.log("근접거리: %i cm", distance);
                    if(distance < 5) led.PwmBlue(255);
                    else if(distance >= 5 && distance < 10) led.PwmBlue(170);
                    else if(distance >= 10 && distance < 20) led.PwmBlue(100);
                    else if(distance >= 20 && distance < 50) led.PwmBlue(50);
                    else if(distance >= 50 && distance < 100) led.PwmBlue(5);
                    else led.pwmBlue(0);
                }
            }
        });
    },
};

module.exports.Init = function(trigpin, echopin) {sonic.init(trigpin, echopin);};
module.exports.Enable = function() {sonic.enable();};
module.exports.Disable = function() {sonic.disable();};
module.exports.Detect = function() {sonic.detect();};