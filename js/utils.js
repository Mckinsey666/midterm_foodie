const rp = require('request-promise');
const $ = require("cheerio");

function getRecipes(){
  const url = "https://tasty.co";
  const index = [0, 1, 2];
  return rp(url)
    .then(html => {
      const recipe = $(".recent-recipes__list", html);
      const dish = index.map(i => $(".feed-item", recipe)[i].attribs.href);
      const content = index.map(i => ['src', 'alt'].map(tag => $(".feed-item__img", recipe)[i].attribs[tag]));
      const res = index.map(i => ({link: dish[i], img:content[i][0], title: content[i][1]}));
      return res;
    })
    .catch(err => {
    });
}

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
      return rp(feed_url)
        .then(html => {
          const recipes = $('.feed-item', html);
          const idx = Math.floor(Math.random() * recipes.length).toString();
          const recipe_url = recipes[idx].attribs.href;
          const content = ['src', 'alt'].map(tag => $(".feed-item__img", html)[idx].attribs[tag]);
          return {link: recipe_url, img: content[0], title: content[1]};
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

getRandomRecipe().then(content => console.log(content)).catch(err => console.log(err));

//export {getRecipes, parseRecipes};


