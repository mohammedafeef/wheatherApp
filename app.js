// all the dependencies of the project
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const fs = require("fs");
const bodyParser= require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
//middleware to load the dependecies folder named public
app.use(express.static('public'));
const weatherPage = fs.readFileSync('wheatherUI.html','utf-8');
//change the content with respect to the post request from the user
const changeTheContent = (page,weatherInfo)=>{
    const imageIcon = `http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`
    // console.log(weatherInfo.weather[0].icons,weatherInfo);
    let tempPage = page.replace("icons/cloud.png",imageIcon)
    tempPage = tempPage.replace("Kochi",weatherInfo.name)
    tempPage = tempPage.replace("23",weatherInfo.main.temp);
    tempPage = tempPage.replace("22",weatherInfo.main.temp_min);
    tempPage = tempPage.replace("25",weatherInfo.main.temp_max);
    // console.log(tempPage);
    return tempPage;
}
//get request handler to the route '/'
app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/wheatherUI.html`,(err)=>{
        err?console.log("error is console logged"+err):console.log("sended sueccsesfully");
    })
})
//post request handler to the route '/'
app.post("/",(req,res)=>{
    console.log("post method is called")
    const place = req.body.place;
    const authToken ='0d376dcd44e835f8eb2eec02692a8e51' ;
    const url =`http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=${authToken}`;
    //making an http request to fetch the data from weather api
    http.get(url,(response)=>{
        //waiting for the reponse of api to get the expected data
        response.on('data',(data)=>{
            const weatherData = JSON.parse(data);
            const weatherObj =[weatherData];
            const updatedPage = weatherObj.map((data)=>changeTheContent(weatherPage,data)).join('');
            res.write(updatedPage);
        })
    })
})
//creating a server to listen to the port 4000
app.listen("4000",()=>{
    console.log("server is listening to port 4000..")
});