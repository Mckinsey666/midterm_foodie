import React from 'react';
import RecipePage from './RecipePage';

class RandomRecipePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content: {
                link: "",
                img: "",
                title: ""
            }
        }
    }

    componentDidMount(){
        this.callBackend()
        .then(res => {
            //console.log(res.recipe);
            this.setState({
                content: res.recipe
            });
        })
        .catch(err => console.log(err));
    }

    callBackend = async ()=>{
        const response = await fetch('/getrandomrecipe');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
          }
        return body;
    };

    render(){
        return(
            <RecipePage item={this.state.content} />
        );
    }
}

export default RandomRecipePage;