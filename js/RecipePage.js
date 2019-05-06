import React from 'react';
import Header from './containers/Header';
import {LocalDrink, RestaurantMenu} from '@material-ui/icons';
import AvatarTitle from './containers/AvatarTitle';
import Button from '@material-ui/core/Button';
import RecipeTitle from './containers/RecipeTitle';
import List from '@material-ui/core/List';
import ListIcon from '@material-ui/icons/List';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


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


class RecipePage extends React.Component {

	constructor(props){
        super(props);
        this.state = {
            steps: [],
            ingredients: [],
            updated: false,
        }
    }
    
	handleSave = () => {
		const recipe = {
            name: this.props.item.title,
            ingredients: this.state.ingredients,
            steps: this.state.steps
        };
        this.sendRecipe(recipe).then(res => {
            console.log(res.content);
        }).catch(err => console.log(err));
    }
    
    sendRecipe = async (data)=>{
		const payload = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};
		const response = await fetch('/addrecipe', payload);
		const body = await response.json();

		if (response.status !== 200) {
				throw Error(body.message) 
			}
		return body;
	};


    componentDidUpdate(){
        if(this.state.steps.length > 0) return; // recipe loaded
        //console.log(this.props.item);
        this.callBackend()
        .then(res => {
            //console.log(res.content);
            this.setState({
                steps: res.content.steps,
                ingredients: res.content.ingredients,
                updated: true,
            });
        })
        .catch(err => console.log(err));
    }

    callBackend = async ()=>{
        const payload = {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({link: this.props.item.link}),
        };
        const response = await fetch('/getrecipe', payload);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
          }
        return body;
    };

    render(){
        return(
            <div id="page-wrapper">
                <Header />
			    <div id="main-wrapper">
                    <RecipeTitle name={this.props.item.title} img={this.props.item.img}/>
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
                                            {this.state.steps.map((item, idx)=>(
                                                <Ingredient item={item} key={idx}/>
                                            ))}
                                        </List>
                                        <Button
                                            variant="contained"
                                            style={styles.button}
                                            onClick={this.handleSave}
                                        >
                                            Save Recipe
										</Button>
									</article>
								</div>
							</div>
                            <StaticIngredient list={this.state.ingredients}/>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default RecipePage;