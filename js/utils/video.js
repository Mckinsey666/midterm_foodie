const rp = require('request-promise');
const $ = require("cheerio");

const query = "shrimp ceviche";
const queryStr = query.split(' ').join("+");
const querybase = "https://www.youtube.com/results?search_query=";
const queryUrl = querybase + queryStr;

rp(queryUrl)
    .then(html => {
        const videos = $("a #thumbnail", html);
        console.log(videos);
    })
    .catch(err => console.log(err));

