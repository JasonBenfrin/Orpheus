const express = require("express")
const app = express()
require('dotenv').config()

app.use(express.static(__dirname))

app.all("/",(req,res)=>{
  res.render("../err/404.html")
} );

function keepAlive(){
  const port = process.env.PORT || 3000
  app.listen(port,()=>{
    console.log(`Server listening at port ${port}`)
  })
}

module.exports = { keepAlive }