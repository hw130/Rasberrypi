const network = require('network');
const humitemp = require('./humitemp.js');
const lcd = require('./lcd.js');
const realy = require('./myRelay.js');
const HTPIN = 21;
const RELAY = 19;
let temp = 0;

humitemp.init(HTPIN);
lcd.init();

relay.Init(RELAY);
setImmediate(realy.toggle);

console.log("======================================");
console.log("3초후부터 5초간격으로 온도와 습도를 측정합니다.");
console.log("======================================");


network.get_actice_interface((err, ifaces) => {
    if(ifaces !== undefined){
        if(ifaces.name == 'wlan0'){
            flag = setInterval(() => {humitemp.read();}, 5000);
            console.log('Temperature Humidity: ', flag);
            lcd.printMessage('', flag);


            if(flag > temp * 1.1){
                temp = flag
                setImmediate(relay.toggleOn);
            } else {
                setImmediate(relay.toggleOff);
            }

        } 
    }
});

process.on('SIGINT', function(){
    relay.Exit();
    console.log('프로그램 종료');
    process.exit();
});