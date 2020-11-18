let util = require('util'),
EventEmitter = require('events')

function SHO () {

EventEmitter.call(this)

}

util.inherits(SHO, EventEmitter)

let cA = []
let tA = []
let tiA = []

SHO.prototype.get = function (event, data) {    
    let period = data.period || 14
    let C = data.array.slice(-1)[0] // Current
    let Cy = data.array.slice(-period)[0] // before last
    let Cby =data.array.slice(0)[0] // current
    let c = (C-Cy)-(Cy-Cby)

    if(cA.length >= period*2){
        cA = cA.slice(-period)
    }
    cA.push(c)

    let cArray = cA

    let cEma = emaResult(period, cArray)

    cEma = cEma.slice(-1)[0]

    let T = (Math.PI*2)*(Math.sqrt(Math.abs((C-Cy)/cEma)))

    if(T = T){
        if(tA.length >= period*2){
            tA = tA.slice(-period)
        }
        tA.push(T)

        let TArray = tA 

        let TP = emaResult(period, TArray)
        TP = TP.slice(-1)[0]
        
        let Ti
        if(C>Cy){
            Ti = 1*T
        } else if (C<Cy){
            Ti = -1*T
        }

        if(tiA.length >= period*2){
            tiA = tiA.slice(-period)
        }
        tiA.push(Ti)


        let TiArray = tiA
        
        let VP = emaResult(period, TiArray)
        VP = VP.slice(-1)[0]
   
        let SHO = (VP/TP)*100
        if(SHO = SHO){
            this.emit("result", SHO)
        }
    }

    function emaResult(period, prices) {
        var k = 2/(period + 1);

        emaArray = [prices[0]];

        for (var i = 1; i < prices.length; i++) {
            emaArray.push(prices[i] * k + emaArray[i - 1] * (1 - k));
        }
        if(emaArray.length >= period){
            emaArray = emaArray.slice(-period)
        }
        return emaArray;
    }

}

module.exports = SHO
