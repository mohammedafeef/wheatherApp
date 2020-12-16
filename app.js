const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
const weatherPage = readFileSync('wheatherUI.html','utf-8');
const changeTheContent = (page,weatherInfo)=>{
    const imageIcon = `http://openweathermap.org/img/wn/${weatherInfo.weather[0].icons}@2x.png`
    const tempPage = page.replace("icons/cloud.png",imageIcon)
    tempPage = tempPage.replace("Kochi",weatherInfo.name)
    tempPage = tempPage.replace("23",weatherInfo.main.temp);
    tempPage = tempPage.replace("22",weatherInfo.main.temp_min);
    tempPage = tempPage.replace("25",weatherInfo.main.temp_max);
    return tempPage;
}
app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/wheatherUI.html`,(err)=>{
        err?console.log(err):console.log("sended sueccsesfully");
    })
})
app.post("/",(req,res)=>{
    const place = req.body.place;
    const authToken ='0d376dcd44e835f8eb2eec02692a8e51' ;
    const url =`http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${authToken}`;
    https.get(url,(response)=>{
        response.on('data',(data)=>{
            const weatherData = data.JSON();
            const weatherObj =[weatherData];
            const updatedPage = weatherObj.map((data)=>changeTheContent(weatherPage)).add("");
            res.write(updatedPage);
        })
    })
})
https.get()
app.listen("3000",()=>{
    console.log("server is listening to port 3000..")
});