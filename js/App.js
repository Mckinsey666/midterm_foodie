import React from 'react';
import HomePage from './HomePage';
import RandomRecipePage from './RandomRecipePage';
import CreateRecipePage from './CreateRecipePage';
import SavedRecipePage from './SavedRecipePage';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            render: 'home'
        }
    }

    onClickCreateRecipe = () => {
        this.setState({
            render: 'createrecipe',
        });
    };

    onClickFeelingLucky = () => {
        this.setState({
            render: 'feelinglucky',
        });
    };

    onClickMyRecipe = () => {
        this.setState({
            render: 'myrecipe',
        });
    };

    render(){
        console.log(this.state.render);
        if(this.state.render == 'home'){
            return (<HomePage 
                onClick={{createrecipe: this.onClickCreateRecipe, 
                feelinglucky: this.onClickFeelingLucky,
                myrecipe: this.onClickMyRecipe}} 
            />);
        }
        else if(this.state.render == 'createrecipe'){
            //console.log("hi!!!");
            return (<CreateRecipePage 
                onClick={{createrecipe: this.onClickCreateRecipe, 
                feelinglucky: this.onClickFeelingLucky,
                myrecipe: this.onClickMyRecipe}} 
            />);
        }
        else if(this.state.render == 'feelinglucky'){
            return (<RandomRecipePage
                onClick={{createrecipe: this.onClickCreateRecipe, 
                feelinglucky: this.onClickFeelingLucky,
                myrecipe: this.onClickMyRecipe}} 
            />);
        }
        else if(this.state.render == 'myrecipe'){
            return (<SavedRecipePage
                onClick={{createrecipe: this.onClickCreateRecipe, 
                feelinglucky: this.onClickFeelingLucky,
                myrecipe: this.onClickMyRecipe}} 
            />);
        }
    }
}

export default App;