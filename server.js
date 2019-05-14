import * as scrapeUtils from './js/utils/scrapeUtils';
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require('body-parser');
const RecipeDB = require("./js/database/recipeDB");

let app = express();
const PORT = 3001;
let user;


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.static('public'));

app.listen(PORT, () => console.log("app listening on port " + PORT.toString()));


app.post('/loggedIn', (req, res) => {
    user = req.body.user;
    console.log("Successfully logged in as", user);
})

app.get('/scrape', (req, res) => {
    let content = [];
    scrapeUtils.getRandomRecipe().then(recipe => {
        content.push(recipe);
        scrapeUtils.getRandomRecipe().then(recipe => {
            content.push(recipe);
            scrapeUtils.getRandomRecipe().then(recipe => {
                content.push(recipe);
                res.send({recipe: content})
            })
        })
    })
});


app.post('/getrecipe', (req, res) => {
    //console.log(req.body);
    scrapeUtils.parseRecipes(req.body.link).then(content => {
        res.send({content: content});
    });
})

// MongoDB connection


mongoose.connect('mongodb+srv://server:12345@webmidterm-hnka6.gcp.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
})


const db = mongoose.connection;

db.on('error', error => {
    console.log(error)
})

db.once('open', () => {
    console.log("MongoDB connected!");

    //RecipeDB.collection.drop();

    RecipeDB.find().exec((err, res) => {
        if(err) console.log(err);
        console.log(res.length);
    });

    app.get('/loadRecipes', (req, res) => {
        RecipeDB.find({user: user}).exec((err, content) => {
            if(err) console.log(err);
            res.send({data: content});
        });
    })

    app.post('/addrecipe', (req, res) => {
        console.log(req.body);
        res.send({content: "Recipe Added!"});
        const recipe = new RecipeDB(req.body);
        recipe.save(err => {
            if(err) console.log(err);
            else console.log("Successfully saved!");
        })
    });
});


app.get('/getrandomrecipe', (req, res) => {
    scrapeUtils.getRandomRecipe().then(content => {
        console.log(content);
        res.send({recipe: content})
    }).catch(err => console.log(err));
});
