const http = require('http'); //webserver
const fs = require('fs'); //Only read of html file
const network = require('network') //accept ip address
const socketio = require('socket.io');
const mcpadc = require('mcp-spi-adc');
const joystick = require('/sensors/joystick.js') //joystick
const PORT = 650001;

const serverbody = (request, response) => {
    fs.readFile('views/chart.html', 'utf8', (err,data) => {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
        console.log("웹페이지에 접속했습니다.");
    });
};

const server = http.createServer(serverbody);
const io = require('socket.io')(server);

joystick.init(io);

io.on('connection', client => {
    client.on('startmsg', function(data){
        console.log('가동메세지 수신(측정주기: %d)!', data);
        timeout = data;
        joystick.start(data); //조이스틱 가동
    });

client.on('stopmsg', funcion(data){
        console.log('중지메세지 수신');
        joystick.stop();
    });
});

server.listen(PORT, () => {
    network.get_active_interface((err, ifaces) => {
        if(ifaces !== undefined){
            if(ifaces.name == 'wlan0'){
                console.log("======================================")
                console.log('조이스틱 제어용 웹서버');
                console.log('웹서버가 대기중입니다 http://' + ifaces.ip_address+":" + PORT);
                console.log("웹브라우저를 열고, 라즈베리파이 웹주소로 접속하세요");
                console.log("======================================")
            }
        }
    });
});

process.on('SIGINT', () => {
    joystick.terminate();
});
