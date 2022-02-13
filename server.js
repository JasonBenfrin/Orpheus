const express = require("express")
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname)));

app.all("/",(req,res)=>{
  res.sendFile(path.join(__dirname+'/err/index.htm'))
});

function keepAlive(){
  app.listen(port,()=>{
    console.log("Alive")
  })
}

module.exports=keepAlive