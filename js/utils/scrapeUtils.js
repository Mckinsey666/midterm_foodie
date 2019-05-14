const rp = require('request-promise');
const $ = require("cheerio");

function parseRecipes(url){
  return rp(url)
    .then(html => {
      const ingredients = [];
      $('.ingredients__section li', html).each((i, item) => {
        const str = $(item).text().split('\n').map(str => str.trim()).filter(str => str !== "").join(' ');
        ingredients.push(str);
      });
      const steps = $(".prep ol", html).text().split('\n').map(str => str.trim()).filter(str => str !== "");
      return {ingredients: ingredients, steps: steps};
    })
    .catch(err => {});
}

function getRandomRecipe(){
  const base_url = "https://tasty.co/topic/easy-dinner";
  return rp(base_url)
    .then(html => {
      const feeds = $('.feed-item', html);
      const feed_url = feeds[Math.floor(Math.random() * feeds.length).toString()].attribs.href;
      console.log(feed_url);
      return rp(feed_url)
        .then(html => {
          const recipes = $('.feed-item', html);
          const idx = Math.floor(Math.random() * recipes.length).toString();
          //console.log(recipes.length);
          //console.log($(".feed-item__img", html).length);
          const recipe_url = recipes[idx].attribs.href;
          const content = ['src', 'alt'].map(tag => $(".feed-item__img", html)[Math.floor(2 * idx)].attribs[tag]);
          return {link: recipe_url, img: content[0], title: content[1]};
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

//getRandomRecipe().then(content => console.log(content)).catch(err => console.log(err));

export {parseRecipes, getRandomRecipe};


