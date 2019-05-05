import * as utils from './js/utils.js';

const express = require("express");

let app = express();
const PORT = 3001;

app.use(express.static('public'));

app.listen(PORT, () => console.log("app listening on port " + PORT.toString()));


app.get('/scrape', (req, res) => {
    utils.getRecipes().then(content => {
        res.send({recipe: content});
    })
});


app.get('/getrecipe', (req, res) => {
    //console.log(req.body);
    utils.parseRecipes('https://tasty.co/recipe/grilled-pound-cake-with-berries').then(content => {
        res.send({content: content});
    });
})