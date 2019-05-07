import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import HomePage from './HomePage';
import RecipePage from './RecipePage';
import RandomRecipePage from './RandomRecipePage';
import CreateRecipePage from './CreateRecipePage';
import SavedRecipePage from './SavedRecipePage';
import {Switch, Route, NavLink } from 'react-router-dom';

const styles = {
    logout: {
        cursor: "pointer",
        color: "rgb(196, 197, 198)",
    },
    username: {
        marginLeft: "0.5em",
        fontSize: "2em"
    }
}

class Blog extends React.Component {

    state = {
        open: true,
    }
    recipeRef = React.createRef();

    closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false });
    };

    render(){
        return(
            <div>
                <div id="header-wrapper" className="header">
                    <header id="header" className="container">
                        <div id="logo">
                            <h1><NavLink to="/">Foodie</NavLink></h1>
                            <span>Know Your Dishes. Create Your Recipes.</span>
                        </div>
                            <nav id="nav">
                                <ul>
                                    <li><NavLink to="/myrecipe">My Recipes</NavLink></li>
                                    <li><NavLink to="/createrecipe">Create Recipe</NavLink></li>
                                    <li><NavLink to="/feelinglucky">Feeling Lucky</NavLink></li>
                                    <li>
                                        <NavLink 
                                            to="/"
                                            onClick={() => this.props.onLogout()}
                                            style={styles.logout}
                                        >
                                            Logout
                                        </NavLink>
                                    </li>
                                </ul>   
                            </nav>
                    </header>
                </div>
                <Switch>
                    <Route 
                        exact path="/" 
                        render={(props) => <HomePage {...props} ref={this.recipeRef}/>} 
                    />
                    <Route 
                        path="/myrecipe" 
                        render={(props) => <SavedRecipePage {...props} user={this.props.username}/>}
                    />
                    <Route 
                        path="/createrecipe"
                        render={(props) => <CreateRecipePage {...props} user={this.props.username}/>}
                    />
                    <Route 
                        path="/feelinglucky"
                        render={(props) => <RandomRecipePage {...props} user={this.props.username}/>}
                    />
                    <Route 
                        path="/recipe" 
                        render={(props) => <RecipePage {...props} 
                            user={this.props.username} 
                            item={this.recipeRef.current.state.selected}
                        />}
                    />
                </Switch>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    style={styles.snackbar}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.closeSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={
                        <span 
                            id="message-id" 
                            style={styles.message}
                        >
                            Logged in as 
                            <span style={styles.username}> {this.props.username}</span>
                        </span>
                    }
                />
            </div>
        );
    }
}

export default Blog;