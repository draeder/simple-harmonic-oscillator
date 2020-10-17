let util = require('util'),
EventEmitter = require('events')
const EMA = require('technicalindicators').EMA

function SHO () {

EventEmitter.call(this)

}

util.inherits(SHO, EventEmitter)

let cA = []
let tA = []
let tiA = []

SHO.prototype.get = function (event, data) {    
    let period = data.period || 14
    let C = data.array.slice(-1)[0] // last
    let Cy = data.array.slice(-2)[0] // before last
    let Cby = data.array.slice(0)[0] // current
    let c = (C-Cy)-(Cy-Cby)

    cA.push(c)

    let cArray = cA

    let cEma = emaResult(period, cArray)

    cEma = cEma.slice(-1)[0]

    let T = (Math.PI*2)*(Math.sqrt(Math.abs((C-Cy)/cEma)))

    if(T = T){
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
 
        tiA.push(Ti)
        let TiArray = tiA
        
        let VP = emaResult(period, TiArray)
        VP = VP.slice(-1)[0]
   
        let SHO = (VP/TP)*100
        if(SHO = SHO){
            this.emit("result", SHO)
        }
    }

    function emaResult(period, array){
        let input = {
            period: period,
            values: array
        }
        
        let result = EMA.calculate(input)
        return result
    }

}

module.exports = SHO
