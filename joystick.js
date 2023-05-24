const mcpadc = require('mcp-spi-adc'); //MCP3208 제어모듈
const 
const SPI_SPEED = 1000000 //Clock Speed = 1Mhz
const VPX = 0 //ADC 0번째 채널 선택=아날로그 센터
const VRY = 1 //ADC 0번째 채널 선택 = 아날로그 센터
const VCD = 2
const SND = 3

const joyStick = {
    joyX: 0,
    joyY: 0,
    webio: 0,
    timerId: 0,
    light = 0,
    sound = 0,

    init(io) => {
        joyStick.joyX = mcpadc.openMcp3208(VRX,
            {speedHz: SPI_SPEED},
            (err) => {
                console.log("SPI 채널 0 초기화완료!");
                console.log("------------");
                if(err) {console.log('채널 0 초기화 실패!(HW점검!)'); process.exit();}
            });
        joyStick.joyY = mcpadc.openMcp3208(VRY,
            {speedHz: SPI_SPEED},
            (err) => {
                console.log("SPI 채널 1 초기화완료!");
                console.log("----------------");
                if(err) {console.log("채널 1 초기화 실패!(HW점검!)"); process.exit()}
            });
        joyStick.light = mcpadc.openMcp3208(VCD, 
            {speedHz: SPI_SPEED}, 
            (err) => {
                console.log("SPI 채널 2 초기화 완료!");
                console.log("------------------");
            if (err) {
                    console.log("채널 2 초기화 실패!(HW 점검!)");
                    process.exit();
                }
            });
            joyStick.sound = mcpadc.openMcp3208(SND, {speedHz: SPI_SPEED}, (err) => {
                console.log("SPI 채널 3 초기화 완료!")
                console.log("------------------");
                if (err) {
                    console.log("채널 3 초기화 실패!(HW 점검!)");
                    process.exit();
                }
            });
        joyStick.webio = io;
    },
    read: () => {
        let xvalue = -1, yvalue = -1, lightValue = -1, soundValue = -1;

        joyStick.joyX.read((error, reading) => {
            xvalue = reading.rawValue;
            joyStick.joyY.read((error, reading) => {
                yvalue = reading.rawValue;
                joyStick.light.read((error, reading) => {
                    lightValue = reading.rawValue;
                    joyStick.sound.read((error, reading) => {
                        soundValue = reading.rawValue;
                        console.log("X좌표: %d          Y좌표 (%d)", xvalue, yvalue);
                        console.log("조도센서 값: %d    사운드센서 값: %d", lightValue, soundValue);
                        if (xvalue !== -1 && yvalue !== -1) {
                            joyStick.webio.sockets.emit('watch', xvalue, yvalue);
                            xvalue = yvalue = -1;
                        }
                        if (lightValue !== -1 && soundValue !== -1) {
                    
                            lightValue = soundValue = -1;
                        }
                    });
                });
            });
        });
        
    };

    start: (timerValue) => {
        if(joyStick.timerId == 0){
            joyStick.timerId = setInterval(joyStick.read, timerValue);
        } else{ console.log("이미 가동중입니다.........");}
    };
    stop: () => {
        if(joyStick.timerId != 0){
            clearInterval(joyStick.timerId);
            joyStick.timerId = 0;
        }
    };
    terminate: () => {
        joyStick.joyX.close(() => {
            joyStick.joyY.close(() => {
                console.log('MCP-ADC를 해제하고, 웹서버를 종료합니다.');
                process.exit();
            });
        });
    }
}

module.exports.init = joyStick.init;
module.exports.read = joyStick.read;
module.exports.start = joyStick.start;
module.exports.stop = joyStick.stop;
module.exports.terminate = joyStick.terminate;