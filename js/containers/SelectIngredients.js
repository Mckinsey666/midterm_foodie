import React from 'react';
import ReactDOM from 'react-dom';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import AvatarTitle from './AvatarTitle';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


const styles = {
    sidebar: {
        width: "100%",
        height: '100px',
        backgroundColor: 'red',
    },
    textField: {
        width: '100%',
    },
    button: {
        width: '100%',
        fontWeight: '1',
        backgroundColor: 'rgb(239, 239, 237)'
    },
    card: {
        height: "60px",
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
                        <div className="ingredient-inner-container">
                            <div>
                                <Typography style={styles.ingredientText} color="textSecondary">{props.value}</Typography>
                            </div>
                            <div className="delete-button">
                                <IconButton onClick={props.handleDelete}>
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

class TextWithState extends React.Component {
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
            <div className="container">
                <TextField
                    label={this.props.label}
                    style={styles.textField}
                    variant="outlined"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}


class SelectIngredients extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            list: [],
            uid: 0,
        }
        this.ingredient = React.createRef();
        this.quantity = React.createRef();
    }

    handleAddIngredient = event => {
        const item = {ingredient: this.ingredient.current.state.value, 
                      quantity: this.quantity.current.state.value, 
                      id: this.state.uid,
                    };
        this.setState(prevState => ({
            list: [...prevState.list, item],
            uid: prevState.uid + 1,
        }));
        this.ingredient.current.setState({value: ""});
        this.quantity.current.setState({value: ""});
    }

    handleDelete = id => {
        this.setState({
            list: this.state.list.filter(item => item.id != id),
        });
    }

    render(){
        return(
            <div className="col-4 col-12-medium">
				<div id="sidebar">
				    <section>
                        <AvatarTitle 
                            icon={<LocalDrinkIcon/>}
                            heading="Ingredients"
                        />
                        <TextWithState ref={this.ingredient} label="Ingredients" />
                        <TextWithState ref={this.quantity} label="Quantity" />
                        <div className="container">
                            <Button 
                                variant="contained"
                                style={styles.button}
                                onClick={this.handleAddIngredient}
                            >
                                Add Ingredients
                            </Button>
                        </div>
                        <div className="ingredient-list">
                            <List style={{maxHeight: "100%", overflow: 'auto'}}>
                            {this.state.list.map((obj, idx) => (
                                <Ingredient 
                                    item={obj.ingredient} 
                                    value={obj.quantity} 
                                    key={obj.id}
                                    handleDelete={() => this.handleDelete(obj.id)}
                                />
                            ))}
                            </List>
                        </div>
					</section>
				</div>
		    </div>
        );
    }
}

export default SelectIngredients;