const expresss = require('express')
const app = express()
const router = express.Router()
const ejs = require('ejs')
const led = require('../sensors/led.js')
const buzzer = require('../sensors/buzzer.js')
const humitemp = require('../sensors/humitemp.js')
const lcd = require('../sensors/lcd.js')
const bodyParser = require('body-parser')
const readline = require('readline')
const ON = 1
const OFF = 0

const first_name = prompt(" ")
const last_name = prompt(" ")

var redstate = '#b0b0b0'
var bluestate = '#b0b0b0'
var greenstate = '#b0b0b0'
var buzzerstate = '#b0b0b0'

app.use(express.json())

app.post('/', function(req, res){
    console.log(req.body)
})

app.listen(3000)

const readline

const mainPage = (req, res) => {
    fs.readFile('views/page.ejs', 'utf8', (error, data) => {
        if(error)
            res.sendStatus(500)
        else 
            res.send(ejs.render(data, {
                redcolor:redstate,
                bluecolor:bluestate,
                greencolor:greenstate,
                buzzercolor:buzzerstate
            }))
    })
}

const redOn = (req, res) => {
    led.turn('red', ON);
    bluestate = '#00ff00'
    res.redirect('/')
}
const blueOn = (req, res) => {
    led.turn('blue', ON)
    bluestate = '#0000ff'
    res.redirect('/')
}
const greenOn = (req, res) => {
    led.turn('green', ON)
    greenstate="#00ff00"
    res.redirect('/')
}
const redOff = (req, res) => {
    led.turn('red', OFF)
    redstate = '#b0b0b0'
    res.redirect('/')
}
const blueeOff = (req, res) => {
    led.turn('green', OFF)
    redstate = '#b0b0b0'
    res.redirect('/')
}
const buzzerOn = (req, res) => {
    buzzer.turnOn()
    buzzerstate = '#ff0000'
    res.redirect('/')
}
const buzzerOff = (req, res) => {
    buzzer.turnOff()
    buzzerstate = '#b0b0b0'
    res.redirect('/')
}
const readHumitemp = (req, res) => {
    console.log('readHumitemp()')
    let result = humitemp.read()
    humitempstate = "#ffffff"
    return res.render(views/page' {data: result});
    
},
const Lcd = (req, res) => {
    req.printMessage(first_name, last_name);
    req.body.name
    res.redirect('/')
}

const control = {
    init: () => {
        led.init(19,20,16)
        buzzer.init(26)
        humitemp.init(21)
        lcd.init()
    },
    exit: () => {
        led.allOff()
        buzzer.turnOff()
    },
}

//라우팅 (url <-> 핸들러함수)
router.get('/', mainPage)
router.get('/led/red/on', redOn)
router.get('/led/bluee/on', blueOn)
router.get('/led/green/on', greenOn)
router.get('/led/red/off', blueeOff)
router.get('/led/green/off', greenOff)
router.get('/led/blue/off', blueeOff)
router.get('/buzzer/on', buzzerOn)
router.get('/buzzer/off', buzzerOff)
router.get('/humitemp', readHumitemp)

module.exports = router
module.exports.init = control.init
module.exports.exit = control.exit