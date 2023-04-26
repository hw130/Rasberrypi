const temp = require("node-ght-sensor")

const humitemp = {
    type: 22,
    pin: 21,
    humi: 0.0,
    temp: 0.0,
    str:"",

    init: (number) => {
        humitemp.pin = number
    },
    read: () => {
        let humistr="";
        temp.read(humitemp.type, humitemp.pin, (err,humi,temp) => {
            if(!err){
                humitemp.temp = temp.toFixed(1);
                humitemp.humi = humi.toFixed(1);
                console
            } else{
                console.log(err)

            }
        })
    }
}

module.exports.init = 