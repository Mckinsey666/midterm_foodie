import React from 'react';
import RecipeBox from './RecipeBox';

class RandomRecipeColumn extends React.Component {
    render(){
        return(
            <div id="features-wrapper">
				<div className="container">
					<div className="row">
						<RecipeBox item={this.props.recipe[0]}/>
                        <RecipeBox item={this.props.recipe[1]}/>
                        <RecipeBox item={this.props.recipe[2]}/>
					</div>
				</div>
			</div>
        );
    }
}

export default RandomRecipeColumn;