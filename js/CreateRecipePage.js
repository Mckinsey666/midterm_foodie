import React from 'react';
import Header from './containers/Header';
import DragDropRecipe from './containers/DragDropRecipe';
import SelectIngredients from './containers/SelectIngredients';
import {List, RestaurantMenu} from '@material-ui/icons';
import AvatarTitle from './containers/AvatarTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const styles = {
	textField: {
		width: "100%",
	},
	button: {
        fontWeight: '1',
		backgroundColor: 'rgb(239, 239, 237)',
		width: '100%',
		height: '100%',
	},
	bigButton: {
		fontWeight: '1',
		backgroundColor: 'rgb(239, 239, 237)',
		width: '100%',
	}
}

class TextWrapper extends React.Component {
	constructor(props){
	  super(props);
	  this.state = {
		value: "",
	  }
	}
  
	handleChange = event => {
	  this.setState({
		  value: event.target.value,
	  })
	}
  
	render(){
	  return(
		<div>
		  <TextField
			  label={this.props.label}
			  variant="outlined"
			  style={styles.textField}
			  value={this.state.value}
			  onChange={this.handleChange}
		  />
		</div>
	  );
	}
  }

class CreateRecipePage extends React.Component {

	constructor(props){
		super(props);
		this.ingredientList = React.createRef();
		this.recipe = React.createRef();
		this.dishName = React.createRef();
		this.state = {
			uid: 0,
		}
	}

	handleAddStep = () => {
		const recipeRef = this.recipe.current;
		//console.log(recipeRef.state);
		recipeRef.setState(prevState => ({
			items: [...prevState.items, {id: `item-${this.state.uid}`}],
			refs: [...prevState.refs, React.createRef()],
		}))
		this.setState(prevState => ({
			uid: prevState.uid + 1,
		}));
	}

	handleSave = () => {
		const steps = this.recipe.current.state.refs.map(item => item.current.state.value).filter(item => item != "");
		const ingredients = this.ingredientList.current.state.list.filter(item => item.ingredient != "");
		const name = this.dishName.current.state.value;
		const recipe = {
			name: name,
			ingredients: ingredients,
			steps: steps
		}
		//console.log(recipe);
	}

    render(){
        return(
            <div id="page-wrapper">
                <Header />
			    <div id="main-wrapper">
					<div className="container">
						<div className="row gtr-200">
							<div className="col-8 col-12-medium">
								<div id="content">
									<article>
										<div className="container">
											<div className="recipe-inner-container-1">	
												<AvatarTitle 
													icon={<RestaurantMenu />}
													heading="Recipe Name"
												/>
											</div>
											<div className="recipe-inner-container-2">
												<TextWrapper ref={this.dishName} label="Recipe" />
											</div>
											
										</div>
										<div className="container">
											<div>
												<AvatarTitle 
													icon={<List/>}
													heading="Steps"
												/>
											</div>
											<div className="step-inner-container">
											<Button 
												variant="contained"
												style={styles.button}
												onClick={this.handleAddStep}
											>
												Add Step
											</Button>
											</div>
										</div>
                                        <DragDropRecipe ref={this.recipe}/>
										<Button 
											onClick={this.handleSave}
											variant="contained"
											style={styles.button}
										>
											Save Recipe
										</Button>
									</article>
								</div>
							</div>
                            <SelectIngredients ref={this.ingredientList}/>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default CreateRecipePage;