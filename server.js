import * as utils from './js/utils.js';
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require('body-parser');
const RecipeDB = require("./js/database/recipeDB");

let app = express();
const PORT = 3001;


app.use(bodyParser.json())
app.use(express.static('public'));

app.listen(PORT, () => console.log("app listening on port " + PORT.toString()));


app.get('/scrape', (req, res) => {
    utils.getRecipes().then(content => {
        res.send({recipe: content});
    })
});


app.post('/getrecipe', (req, res) => {
    //console.log(req.body);
    utils.parseRecipes(req.body.link).then(content => {
        res.send({content: content});
    });
})

// MongoDB connection

/*
mongoose.connect('mongodb+srv://Mckinsey666:doodlebean123@webmidterm-hnka6.gcp.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})

const db = mongoose.connection;

db.on('error', error => {
    console.log(error)
})

db.once('open', () => {
    console.log("MongoDB connected!");

    RecipeDB.find().exec((err, res) => {
        if(err) console.log(err);
        console.log(res);
    });

    app.get('/addrecipe', (req, res) => {
        console.log("hi!");
        res.send({content: "Recipe Added!"});
    });
});
*/

app.post('/addrecipe', (req, res) => {
    console.log(req.body);
    res.send({content: "Recipe Added!"});
});