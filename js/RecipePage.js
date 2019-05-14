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
        color: "rgb(155, 155, 155)",
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
        this.recipeRef= React.createRef();
    }
    
	handleSave = () => {
        let title, imgUrl;
        if(this.props.item) {
            title = this.props.item.title;
            imgUrl = this.props.item.img;
        }
        else {
            title = this.props.location.item.title;
            imgUrl = this.props.location.item.img;
        }

		const recipe = {
            name: title,
            ingredients: this.state.ingredients,
            steps: this.state.steps,
            stars: this.recipeRef.current.ratingRef.current.state.stars,
            user: this.props.user,
            imgSrc: imgUrl,
            decompress: false
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


    callBackend = async ()=>{
        let link;
        if(this.props.item) link = this.props.item.link;
        else link = this.props.location.item.link;
        console.log("link", link);
        const payload = {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({link: link}),
        };
        const response = await fetch('/getrecipe', payload);
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message) 
          }
        return body;
    };

    render(){
        let item;
        if(this.props.item) item = this.props.item;
        else item = this.props.location.item;
        
        if(this.state.steps.length === 0){
            this.callBackend()
            .then(res => {
                this.setState({
                    steps: res.content.steps,
                    ingredients: res.content.ingredients,
                    updated: true,
                });
            })
            .catch(err => console.log(err));
        }
        
        return(
            <div id="page-wrapper">
			    <div id="main-wrapper" className="animated fadeIn delay-3s">
                    <RecipeTitle ref={this.recipeRef} name={item.title} img={item.img}/>
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