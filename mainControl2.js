const sonic = require('./sonic.js')

const TRIG = 13;
const ECHO = 6;

sonic.Init(TRIG, ECHO);
sonic.Detect();
sonic.Enable();

process.on('SIGINT', function(){
    sonic.Disable();
    console.log("프로그램이 종료됩니다....");
    process.exit();
});