import React from 'react';
import Header from './containers/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/List';
import FoodIcon from '@material-ui/icons/RestaurantMenu';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import AvatarTitle from './containers/AvatarTitle';
import * as utils from './utils.js';

const styles = {
    card: {
        height: "60px",
        width: "100%",
        margin: "0 auto",
        marginTop: "10px",
    },
    itemText: {
        fontSize: "1em",
    },
    contentContainer: {
        width: "100%",
        margin: "0 auto"
    },
    textContainer: {
        marginLeft: "2%",
    },
    button: {
        width: '5%',
        fontWeight: '1',
        backgroundColor: 'rgb(239, 239, 237)'
    },
    buttonContainer: {
        marginLeft: "auto"
    }
}

function RecipeItem(props){
    return(
        <div>
            <Card style={styles.card}>
                <CardContent>
                    <div className="ingredient-container">
                        <FoodIcon />
                        <div style={styles.textContainer}>
                            <Typography style={styles.itemText}>{props.item}</Typography>
                        </div>
                        <div style={styles.buttonContainer}>
                            <Button 
                                variant="contained"
                                style={styles.button}
                            >
                                View
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

class HomePage extends React.Component {
    render(){
        return(
            <div id="page-wrapper">
                <div id="main-wrapper">
					<div className="container">
						<div id="content" style={styles.contentContainer}>
							<article>
                                <AvatarTitle heading="Saved Recipes" icon={<ListIcon />}/>
                                <List style={{maxHeight: "300px", overflow: 'auto'}}>
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, idx)=>(
                                        <RecipeItem item={item} index={idx+1} key={idx} />
                                    ))}
                                </List>
							</article>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default HomePage;