const express = require("express")
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const path = require('path')

app.use(express.static(path.join(__dirname,'/public')));

app.get('/status',(req,res) => {
	res.send('I\'m Alive.')
})

app.all("/*",(req,res)=>{
	res.sendFile(path.join(__dirname,'/public/err/404.html'))
});

function keepAlive(){
  app.listen(port,()=>{
    console.log("Alive")
  })
}

module.exports=keepAlive