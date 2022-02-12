const express = require("express")
const app = express()

app.use(express.static(__dirname))

app.all("/",(req,res)=>{
  res.sendFile("../err/404.html")
} );

function keepAlive(){
  app.listen(3000,()=>{
    console.log("Alive")
  })
}

module.exports = { keepAlive }