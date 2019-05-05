import * as utils from './js/utils.js';

const express = require("express");

let app = express();
const PORT = 3001;

app.use(express.static('public'));

app.listen(PORT, () => console.log("app listening on port " + PORT.toString()));

utils.getRecipes().then(content => {
    app.get('/scrape', (req, res) => {
        res.send({recipe: content});
    });
});


