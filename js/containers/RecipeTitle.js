import React from 'react';
import Divider from '@material-ui/core/Divider';
import RatingWrapper from './RatingWrapper';

const styles = {
	banner: {
		fontSize: "2em",
    }
}

class RecipeTitle extends React.Component {
	constructor(props){
		super(props);
		this.ratingRef = React.createRef();
	}
    render(){
        return(
            <div id="banner-wrapper">
				<div id="banner" className="box container">
					<div className="row">
						<div style={{position: "relative"}} className="col-7 col-12-medium">
							<h2>{this.props.name}</h2>
							<Divider style={{width: "500px"}}/>
							<RatingWrapper ref={this.ratingRef}/>
						</div>
						<div className="right-align col-5 col-12-medium">
							<img className="recipe-image" src={this.props.img} />
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default RecipeTitle;