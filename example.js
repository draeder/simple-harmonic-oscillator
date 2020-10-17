const SHO = require ("./SHO")
const sho = new SHO

let period = 14 // default period for SHO
let array = []
let bought = false

sho.on("result", result => {
    //console.log("SHO:",result)
    if(result < -60 || result < -40 || result == 0) {
        if(bought == false){
            console.log("BUY - Oversold:", result, "Price:", array.slice(-1)[0])
            bought = true
        }
    }
    
    if(result > 60 || result > 40) {
        if(bought == true){
            console.log("SELL - Overbought:", result, "Price:", array.slice(-1)[0])
            bought = false
        }
    }
})

//** random example data
let base = 451 // base price
let percent = 7 // price+- percent swing

let range = (percent / 100) * base // range percent
let min = base-range/2
let max = base+range/2

setInterval(()=>{
    array.push(rand(min, max)) // simulates stock price fluctuations
    sho.get("result", {array}) // send data to get realtime SHO
},
    1 // rand(10, 1000) simulates the random nature of market price change intervals
) 

function rand(min, max){
    let result = Math.random() * (max - min) + min
    return result
}
//**