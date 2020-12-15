const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/wheatherUI.html`,(err)=>{
        err?console.log(err):console.log("sended sueccsesfully");
    })
})


app.listen("3000",()=>{
    console.log("server is listening to port 3000..")
});