const SHO = require ("./SHO")
const sho = new SHO

let period = 14 // default period for SHO
let array = []
let bought = false

sho.on("result", result => {
    //console.log("SHO:",result)
    if(result >= 0) {
        if(bought == false){
            console.log("BUY: Uptrend", "Price: ", array.slice(-1)[0])
            bought = true
        }
    }
    if(result < -40) {
        if(bought == false){
            console.log("BUY: Oversold", "Price: ", array.slice(-1)[0])
            bought = true
        }
    }
    if(result < -60) {
        if(bought == false){
            console.log("BUY: Etremely oversold", "Price: ", array.slice(-1)[0])
            bought = true
        }
    }
    if(result > 40) {
        if(bought == true){
            console.log("SELL: Overbought", "Price: ", array.slice(-1)[0])
            bought = false
        }
    }
    if(result > 60) {
        if(bought == true){
            console.log("SELL: Etremely overbought", "Price: ", array.slice(-1)[0])
            bought = false
        }
    }
})

//** random example data
let min = 2.5
let max = 60

setInterval(()=>{
    array.push(rand(min, max)) // simulates stock price fluctuations
    sho.get("result", {array}) // send data to get real time SHO
},10) // simulates the random nature of market data change intervals

function rand(min, max){
    let result = Math.random() * (max - min) + min
    return result
}
//**