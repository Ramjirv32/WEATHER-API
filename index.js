import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";

const app = express();
const port = 12;
const key = "330701b61351367edd6da840005dce58";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { w: null, e: null, o: null });                                 ``
});

app.post("/submit", async (req, res) => {
    const city = req.body.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    
    let w;
    let e = null;

    try {
        const response = await axios.get(url);
        w = response.data;
        const description = w.weather[0].description.toLowerCase(); 
        let o;
        
        if (w.main.temp > 35) {
            o = "s1";  
        } else if (w.main.temp> 30) {
            o = "cs1";  
        } else if (w.main.temp> 20) {
            o = "rain"; 
        } else if (w.main.temp > 15) {
            o = "rain2";  
        } else {
            o = "mist";  
        }
        
        

        res.render("s.ejs", { w, e, o });
    }catch (error) {
        console.error("Error fetching weather data:", error);
        e = "Could not be found";
        res.render("index.ejs", { w: null, e: "City not found", o: null });
    }
});

app.listen(port, () => {
    console.log(`Running on port number ${port}`);
});
