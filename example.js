const SHO = require ("./SHO")
const sho = new SHO

let period = 14 // default period for SHO

sho.on("result", result => {
    console.clear()
    console.log(result)
})

//** random example data
let array = []
let max = 450
let min = 440
setInterval(()=>{
    array.push(rand())
    sho.get("result", {period, array}) // send data to get real time SHO
},300)

function rand(){
    let result = Math.random() * (max - min) + min;
    return result
}
//**