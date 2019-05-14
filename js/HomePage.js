import React from 'react';
import Banner from './containers/Banner';
import RandomRecipeColumn from './containers/RandomRecipeColumn';

class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            recipe: [0, 1, 2].map(i => ({link: "", img: "", title: ""})),
            selected: {link: "", img: "", title: ""}
        }
    }

    componentDidMount(){
        this.callBackend()
        .then(res => {
            this.setState({
                recipe: res.recipe
            });
        })
        .catch(err => console.log(err));
    }

    callBackend = async ()=>{
        const response = await fetch('/scrape');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
          }
        return body;
    };

    render(){
        //console.log(this.state.recipe);
        return(
            <div id="page-wrapper">
                <Banner />
                <RandomRecipeColumn recipe={this.state.recipe}/>
			</div>
        );
    }
}

export default HomePage;