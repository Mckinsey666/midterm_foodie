import React from 'react';
import {LocalDrink, RestaurantMenu} from '@material-ui/icons';
import AvatarTitle from '../components/AvatarTitle';
import RecipeTitle from '../components/RecipeTitle';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PopOutTimer from '../containers/PopOutTimer';
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
    let cardStyle = styles.card;
    if(props.highlight) cardStyle = {...cardStyle, backgroundColor: "rgb(208, 221, 242)"};
    return(
        <div>
            <Card style={cardStyle}>
                <CardContent>
                    <div className="ingredient-container">
                        <div style={styles.stepContainer}>{props.item}</div>
                        {props.timer ? (<div style={styles.buttonContainer}>
                            <Button 
                                style={styles.stepButton}
                                onClick={() => props.onClick(props.item, props.timer, props.idx)}
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
    constructor(props){
        super(props);
        this.state = {
            open: false,
            timerValue: 0,
            timerText: "",
            timerClass: "",
            highlightID: -1,
        }
        this.indices = [];
        for(let i = 0; i < this.props.location.recipe.steps.length; ++i){
            this.indices.push(i);
        }
    }

    hideTimer = () => {
        this.setState({
            open: false,
            timerClass: ""
        })
    }
    
    openTimer = (timerText, timerValue, idx) => {
        this.setState({
            open: true,
            timerValue: timerValue,
            timerText: timerText,
            timerClass: "",
            highlightID: idx
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
                        name={this.props.location.recipe.name} 
                        img={this.props.location.recipe.imgSrc}
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
                                            {this.indices.map(idx =>(
                                                <Step 
                                                    item={this.props.location.recipe.steps[idx]} 
                                                    key={idx} 
                                                    onClick={this.openTimer} 
                                                    timer={this.props.location.recipe.times[idx]}
                                                    idx={idx}
                                                    highlight={idx == this.state.highlightID}
                                                />
                                            ))}
                                        </List>
									</article>
								</div>
							</div>
                            <StaticIngredient list={this.props.location.recipe.ingredients}/>
                            <PopOutTimer
                                open={this.state.open}
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