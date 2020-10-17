const SHO = require ("./SHO")
const sho = new SHO

let period = 14 // default period for SHO

sho.on("result", result => {
    console.clear()
    console.log(result)
})

//** random example data
let array = []
let min = 449
let max = 455

setInterval(()=>{
    array.push(rand(min, max)) // simulates stock price fluctuations
    sho.get("result", {array}) // send data to get real time SHO
},rand(50, 5000)) // simulates the random nature of market data change intervals

function rand(min, max){
    let result = Math.random() * (max - min) + min
    return result
}
//**