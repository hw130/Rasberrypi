const gpio  = require('pigpio').Gpio;
const led = require('./disled.js');

const sonic = {
    trig: null,
    echo: null,
    trigPin: 13,
    echoPin: 6,
    distance: 0,
    sid: 0,

    init: function(trigPin = trigPin, echoPin = echoPin){
        trig = new gpio(trigPin, {mode: gpio.OUTPUT});
        echo = new gpio(echoPin, {mode: gpio.INPUT, alert: true});
        trig.digitalWrite(0);
        led.Init(12,16,21);
        },
    enable: function(){
        console.log("초음파 활성화");
        sid = setInterval(() => {this.trig.trigger(10,1);}, 200);
        },
    disable: function() {
        if(sonic.sid){
            clearTimeout(sid);
            sonic.sid = 0;
            console.log("초음파 비활성화");
        }
    }
}