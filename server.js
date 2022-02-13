const express = require("express")
const server = express()

app.use(express.static(path.join(__dirname)));

server.all("/",(req,res)=>{
  res.sendFile(path.join(__dirname+'/err/index.htm'))
});

function keepAlive(){
  server.listen(3000,()=>{
    console.log("Alive")
  })
}

module.exports=keepAlive