import React from 'react';
import DragDropRecipe from '../containers/DragDropRecipe';
import SelectIngredients from '../containers/SelectIngredients';
import {List, RestaurantMenu} from '@material-ui/icons';
import AvatarTitle from '../components/AvatarTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PopOutImage from '../components/PopOutImage';


const styles = {
	textField: {
		width: "100%",
	},
	button: {
    fontWeight: '1',
		backgroundColor: 'rgb(239, 239, 237)',
		width: '100%',
		height: '100%',
		color: "rgb(155, 155, 155)",
	},
	clearButton: {
		fontWeight: '10',
		fontFamily: "Bree Serif",
		backgroundColor: 'rgb(252, 58, 152)',
		color: "white",
		width: '100%',
		height: '100%',
		color: "white",
	},
	bigButton: {
		fontWeight: '1',
		backgroundColor: 'rgb(239, 239, 237)',
		color: "rgb(155, 155, 155)",
		width: '100%',
	},
	uploadButton: {
    fontWeight: '1',
		backgroundColor: 'rgb(239, 239, 237)',
		width: '100%',
		marginBottom: '5%',
		color: "rgb(155, 155, 155)",
	},
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
			imageFilename: "",
			imageUrl: "",
			imageOpen: false,
			dataUrl: "",
		}
	}

	handleAddStep = () => {
		const recipeRef = this.recipe.current;
		//console.log(recipeRef.state);
		recipeRef.setState(prevState => ({
			items: [...prevState.items, {id: `item-${this.state.uid}`}],
			refs: [...prevState.refs, React.createRef()],
			times: [...prevState.times, React.createRef()],
		}))
		this.setState(prevState => ({
			uid: prevState.uid + 1,
		}));
	}

	handleClear = () => {
		this.setState({
			uid: 0
		});
		this.ingredientList.current.setState({
			list: []
		});
		this.dishName.current.setState({
			value: "",
		});
		this.recipe.current.setState({
			items: [],
			refs: [],
			times: []
		});
	}

	handleSave = () => {
		const indices = [];
		this.recipe.current.state.refs.map(item => item.current.state.value).forEach((item, idx) => {
			if(item != "") indices.push(idx);
		})
		const steps = indices.map(idx => this.recipe.current.state.refs[idx].current.state.value);
		const hms = indices.map(idx => this.recipe.current.state.times[idx].current.state);
		const times = hms.map(
			item => {
				let t = 0;
				if(item.hour != "") t += 3600 * parseInt(item.hour);
				if(item.minute != "") t += 60 * parseInt(item.minute);
				if(item.second != "") t += parseInt(item.second);
				return ((t == 0) ? null : (1000 * t));
			}
		);
		const ingredients = this.ingredientList.current.state.list.filter(item => item.ingredient != "");
		const name = this.dishName.current.state.value;
		const recipe = {
			name: name,
			ingredients: ingredients.map(({ingredient, quantity, id}) => (ingredient + ", " + quantity.toString())),
			steps: steps,
			user: this.props.user,
			imgSrc: this.state.dataUrl,
			stars: 0,
			times: times,
		}
		console.log(times);
		this.callBackend(recipe)
			.then(res => {})
			.catch(err => console.log(err));
	}

	callBackend = async (data)=>{
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

	onUpload = event => {
		const file = event.target.files[0];
		this.setState({
			imageFilename: file.name,
			imageUrl: URL.createObjectURL(file),
			imageOpen: true
		})
		const reader = new FileReader();
		reader.addEventListener("load", () => {
			this.setState({
				dataUrl: reader.result,
			});
		})
		reader.readAsDataURL(file);
	}

	hideImage = () => {
		this.setState({
				imageOpen: false
		})
	}

	showImage = () => {
		this.setState({
			imageOpen: true
		})
	}

    render(){
        return(
            <div id="page-wrapper">
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
												<div style={{display:"flex", width: "100%"}}>
													<div style={{width:"30%"}}>
														<input
															accept="image/*"
															style={{ display: 'none' }}
															id="raised-button-file"
															type="file"
															onChange={this.onUpload}
														/>
														<label htmlFor="raised-button-file">
															<Button 
																variant="contained" 
																component="span"
																style={styles.uploadButton}
															>
																Upload Image
															</Button>
														</label> 
													</div>
													<div 
														style={{width:"60%", marginLeft: "auto", textAlign: "right", cursor:"pointer"}}
														onClick={this.showImage}
													>
														{this.state.imageFilename}
													</div>
												</div>
												<PopOutImage 
													open={this.state.imageOpen} 
													src={this.state.imageUrl} 
													handleClose={this.hideImage}
												/>
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
												<DragDropRecipe handleAddTime={this.handleAddTime} ref={this.recipe}/>
												<Button 
													onClick={this.handleSave}
													variant="contained"
													style={styles.button}
												>
													Save Recipe
												</Button>
												<Button 
													onClick={this.handleClear}
													variant="contained"
													style={styles.clearButton}
												>
													Clear
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