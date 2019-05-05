const rp = require('request-promise');
const $ = require("cheerio");

export function getRecipes(){
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
