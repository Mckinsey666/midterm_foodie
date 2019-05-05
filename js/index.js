import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './HomePage';
import CreateRecipePage from './CreateRecipePage';
import RandomRecipePage from './RandomRecipePage';
import SavedRecipePage from './SavedRecipePage';

const recipe = { 
    link: 'https://tasty.co/recipe/easy-shrimp-ceviche',
    img:'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/214349.jpg?output-quality=60&resize=600:*',
    title: 'Easy Shrimp Ceviche' 
};

ReactDOM.render(
    <RandomRecipePage item={recipe}/>, document.getElementById('root')
);