const express = require('express')
const os = require('os')
const app = express()
const control = require('./webs/control.js')

const PORT = 65000;

app.user('/', control)

app.listen(PORT, () => {
    let ifaces = os.networkInterfaces()
    console.log("-------------웹제어서버 가동--------------")
    console.log("센서 모듈을 초기화합니다.")
    control.init()
    console.log("--------------------------------------------")
    console.log("-- 웹브라우저에서 아래주소로 접속하세요 --")
    console.log('서버실행: ' + wlan0[0].address + ':' +PORT)
    console.log("--------------------------------------------")
    progress.on ('SIGINT', function(){
        console.log('${signal} 프로그램이 종료됩니다...')
        control.exit()
        process.exit()
    })
})