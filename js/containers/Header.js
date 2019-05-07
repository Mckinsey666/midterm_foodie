import React from 'react';
import Button from '@material-ui/core/Button';

const styles = {
	button: {
		width: "px",
	}
}

class Header extends React.Component {
    render(){
        return(
            <div id="header-wrapper" className="header">
				<header id="header" className="container">
					<div id="logo">
						<h1><a href="index.html">Foodie</a></h1>
						<span>Know Your Dishes. Create Your Recipes.</span>
					</div>
						<nav id="nav">
							<ul>
								<li><a onClick={this.props.onClick.myrecipe}>My Recipes</a></li>
								<li><a onClick={this.props.onClick.createrecipe}>Create Recipe</a></li>
								<li><a onClick={this.props.onClick.feelinglucky}>Feeling Lucky</a></li>
								<li><Button>Logout</Button></li>
							</ul>
						</nav>
				</header>
			</div>
        );
    }
}

export default Header;