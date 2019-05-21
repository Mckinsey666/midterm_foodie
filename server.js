import * as scrapeUtils from './js/utils/scrapeUtils';
const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require('body-parser');
const RecipeDB = require("./js/database/recipeDB");
const PasswordDB = require("./js/database/passwordDB");

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
    //PasswordDB.collection.drop();

    RecipeDB.find().exec((err, res) => {
        if(err) console.log(err);
        console.log(res.length);
    });

    PasswordDB.find((err, res) => {
        if(err) console.log(err);
        console.log(res);
    })

    app.post('/register', (req, res) => {
        PasswordDB.find({user: req.body.user}).exec((err, content) => {
            if(err) console.log(err);
            if(content.length == 0){
                const newUser = new PasswordDB(req.body);
                newUser.save(err => {
                    if(err) console.log(err);
                    else console.log("New user added!");
                });
                res.send({content: 'User "' + req.body.user + '" successfully added!', warning: true});
            }
            else{
                res.send({content: "User already exists!", warning: true});
            }
        })
    })

    app.post('/login', (req, res) => {
        PasswordDB.find({user: req.body.user}).exec((err, content) => {
            if(err) console.log(err);
            if(content.length == 0){
                res.send({warning: true, content: "User not found! Please first register."});
            }
            else{
                const account = content[0];
                if(account.password != req.body.password) res.send({warning: true, content: "Wrong password!"});
                else res.send({warning: false, content: "Successfully logged in!"});
            }
        })
    })

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
