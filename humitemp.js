const temp = require("node-dht-sensor");
const relay = require('./myRelay.js');

const humitemp = {
    type: 22,
    pin: 21,
    humi: 0.0,
    temp: 0.0,
    str: "",

    init: (number) => {
        humitemp.pin = number;
        console.log('초기화pin: ' + humitemp.pin);
    },

    read: () => {
        let humistr = "";
        temp.read(humitemp.type, humitemp.pin, (err, temp, humi) => {
            if(!err){
                humitemp.temp = temp.toFixed(1);
                humitemp.humi = humi.toFixed(1);
                humistr = humitemp.temp + 'C', + humitemp.humi + '%'       ;
                console.log(humistr);
                return humitemp.humi;
            }
            else {
                console.log(err);
    
            }
        });
    }


}

module.exports.init = function(number){humitemp.init(number);}
module.exports.read = function(){humitemp.read();};