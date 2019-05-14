import React from 'react';
import {LocalDrink, RestaurantMenu} from '@material-ui/icons';
import AvatarTitle from './containers/AvatarTitle';
import RecipeTitle from './containers/RecipeTitle';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PopOutTimer from './containers/PopOutTimer';
import { Button } from '@material-ui/core';

function sleep (time) {
    var timeout, promise;
    promise = new Promise((resolve) => {
        timeout = setTimeout(resolve, time);
    });
    return {
        promise: promise,
        cancel: () => clearTimeout(timeout),
    };
}

const styles = {
	textField: {
		width: "100%",
	},
	button: {
        fontWeight: '1',
		backgroundColor: 'rgb(239, 239, 237)',
		width: '100%',
        height: '100%',
        marginTop: "50px",
    },
    stepButton: {
        fontWeight: '1',
    },
    buttonContainer:{
        marginRight: "10px",
        marginLeft: "auto"
    },
    stepContainer: {
        width: "70%",
        wordWrap: "break-word",
    },
    card: {
        width: "90%",
        margin: "0 auto",
        marginTop: "10px",
    },
    ingredientText: {
        fontSize: "1em",
    }
}

function Ingredient(props){
    return(
        <div>
            <Card style={styles.card}>
                <CardContent>
                    <div className="ingredient-container">
                        <div>
                            <Typography style={styles.ingredientText}>{props.item}</Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function Step(props){
    return(
        <div>
            <Card style={styles.card}>
                <CardContent>
                    <div className="ingredient-container">
                        <div style={styles.stepContainer}>{props.item}</div>
                        {props.timer ? (<div style={styles.buttonContainer}>
                            <Button 
                                style={styles.stepButton}
                                onClick={() => props.onClick(props.item, props.timer)}
                            >
                                Cook-along
                            </Button>
                        </div>) : (<div></div>)}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function StaticIngredient(props) {
        return(
            <div className="col-4 col-12-medium">
				<div id="sidebar">
				    <section>
                        <AvatarTitle 
                            icon={<LocalDrink/>}
                            heading="Ingredients"
                        />
                        <div className="ingredient-list">
                            <List style={{maxHeight: "100%", overflow: 'auto'}}>
                            {props.list.map((obj, idx) => (
                                <Ingredient 
                                    item={obj}
                                    key={idx}
                                />
                            ))}
                            </List>
                        </div>
					</section>
				</div>
		    </div>
        );
}


class CookAlongPage extends React.Component {
    state = {
        open: false,
        timerValue: 0,
        timerText: "",
        timerClass: ""
    }

    hideTimer = () => {
        this.setState({
            open: false,
            timerClass: ""
        })
    }

    autoClose = value => {

    }
    
    openTimer = (timerText, timerValue) => {
        this.setState({
            open: true,
            timerValue: timerValue,
            timerText: timerText,
            timerClass: "",
        })
    }

    onFinish = value => {
        if(value <= 0){
            this.setState({
                timerClass: "animated infinite flash"
            })
        }
    }

    render(){
        return(
            <div id="page-wrapper">
			    <div id="main-wrapper">
                    <RecipeTitle 
                        name={this.props.recipe.name} 
                        img={this.props.recipe.imgSrc}
                    />
					<div className="container lower">
						<div className="row gtr-200">
							<div className="col-8 col-12-medium">
								<div id="content">
									<article>
										<div className="container">
											<div>
												<AvatarTitle 
													icon={<ListIcon/>}
													heading="Steps"
												/>
											</div>
										</div>
                                        <List style={{maxHeight: "500px", overflow: 'auto'}}>
                                            {this.props.recipe.steps.map((item, idx)=>(
                                                <Step 
                                                    item={item[0]} 
                                                    key={idx} 
                                                    onClick={this.openTimer} 
                                                    timer={item[1]}
                                                />
                                            ))}
                                        </List>
									</article>
								</div>
							</div>
                            <StaticIngredient list={this.props.recipe.ingredients}/>
                            <PopOutTimer
                                open={this.state.open} 
                                autoClose={this.autoClose}
                                handleClose={this.hideTimer} 
                                onFinish={this.onFinish}
                                countdown={this.state.timerValue}
                                text={this.state.timerText}
                                timerClass={this.state.timerClass}
                            />
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default CookAlongPage;