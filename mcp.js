const mcpadc = require('mcp-spi-adc');
const SPI_SPEED = 1000000

const mcp = {
    channel: 0,
    sensor: [0,0,0,0,0,0,0,0],
    timerid:[-1,-1,-1,-1,-1,-1,-1,-1],
    timeouyt: 200,
    data: [],

    Init:(channel) => { mcp.sensor[channel] = mcpadc.openMcp3208(channel,
        {speedHz: SPI_SPEED},
            (err) => {
            console.log('SPI 채널${channel} 초기화 완료!');
            console.log("--------------------");
            if(err) console.log('채널${channel} 초기화실패!(HW점검!)');
        });
    },
    
    readStart: (channel, samplingRate) => {
        mcp.channel = channel;
        mcp.timeout = samplingRate;
        mcp.sensor[channel].read((error, reading) => {
            if(!error) {mcp.data[channel] = reading.rawValue;
                console.log('채널${channel} > 측정값${mcp.data[channel]}');
            }
        });
        if(mcp.timerid[channel] == -1)
        mcp.timerid[channel]=setInterval(mcp.readStart, mcp.timeout,
            mcp.channel, samplingRate);
    },
    readStop:(channel) => {
        console.log('readStop:channel: ${channel}');
        if(mcp.timerid[channel] !== -1){
            clearInterval(mcp.timerid[channel]);
            mcp.timerid[channel] = -1;
        }
    },

}

module.exports.Init = mcp.Init;
module.exports.Start = mcp.readStart;
module.exports.Stop = mcp.readStop;