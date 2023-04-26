const mcp = require('./mcp.js')

const LIGHT = 0;
const SOUND = 1;

mcp.Init(LIGHT);
mcp.Init(SOUND);
setImmediate(mcp.Start, LIGHT, 200);
setImmediate(mcp.Start, SOUND, 100);

process.on('SIGINT', function(){
    mcp.Stop(LIGHT);
    mcp.Stop(SOUND);
    console.log("프로그램이 종료됩니다....");
    process.exit();
});