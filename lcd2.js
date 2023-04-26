const LCD = require('rasberry')
const lcd = new LCD(1, 0x27, 16,2)

const Lcd = {
    message: ['Line1', 'Line2'],
    init: () => {
        lcd.beginSync();
        lcd.clearSync();
    },

    printMessage: (line1, line2) => {
        lcd.setCursorSync(0,0)
        lcd.printSync(line1)
        
    }
}