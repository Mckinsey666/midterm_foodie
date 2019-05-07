import React from 'react';
import RecipeBox from './RecipeBox';

class RandomRecipeColumn extends React.Component {
    render(){
        return(
            <div id="features-wrapper">
				<div className="container">
					<div className="row">
						<RecipeBox onClick={() => this.props.onClick(0)} item={this.props.recipe[0]}/>
                        <RecipeBox onClick={() => this.props.onClick(1)} item={this.props.recipe[1]}/>
                        <RecipeBox onClick={() => this.props.onClick(2)} item={this.props.recipe[2]}/>
					</div>
				</div>
			</div>
        );
    }
}

export default RandomRecipeColumn;