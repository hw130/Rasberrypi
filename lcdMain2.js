const network = require('network')
const lcd = require('./lcd.js')

lcd.Init()

network.get_active_interface((err,ifaces) => {
    if(ifaces !== undefined){
        if(ifaces.name == 'wlan0'){
            console.log(ifaces.ip_address)

            lcd.printMessage('Computer Gachon', ifaces.ip_address)
        }
    }
})