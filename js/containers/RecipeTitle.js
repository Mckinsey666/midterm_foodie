import React from 'react';
import Button from '@material-ui/core/Button';
import FoodGallery from './FoodGallery';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import KeyBoardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyBoardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = {
	banner: {
		fontSize: "2em",
    },
  button: {
		fontWeight: '1',
		backgroundColor: 'rgb(239, 239, 237)',
		width: '100%',
	},
	galleryContaier: {
		position: "absolute",
		bottom: "100px"
	},
	arrowContainer: {
		width: "95%",
		position: "absolute",
		bottom: "0",
	},
	arrowInnerContainer: {
		width: "30%",
		margin: "0 auto",
		display: "flex"
	},
	rightButton:{
		marginLeft: "auto"
	}
}

class RecipeTitle extends React.Component {
    render(){
        return(
                <div id="banner-wrapper">
									<div id="banner" className="box container">
										<div className="row">
											<div style={{position: "relative"}} className="col-7 col-12-medium">
												<h2>{this.props.name}</h2>
												<Divider />
												<div style={styles.galleryContaier}><FoodGallery /></div>
												<div style={styles.arrowContainer}>
													<div style={styles.arrowInnerContainer}>
														<div><Avatar><KeyBoardArrowLeft /></Avatar></div>
														<div style={styles.rightButton}><Avatar><KeyBoardArrowRight /></Avatar></div>
													</div>
												</div>
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