const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const request = require('request-promise')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.set("view engine", "ejs")


app.get('/', (req, res) => {
    res.render("search")
})
app.get('/results', (req, res) => {
    const query = req.query.mySearch;
    const url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb"
    request(url)
    .then((body) => {
        const data = JSON.parse(body)
        res.render('results', {data: data})
    })
    .catch((err) => {
        console.log("error", err)
    })
})







app.listen(3000, function(){
    console.log("Works!")
});