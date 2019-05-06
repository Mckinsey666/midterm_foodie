import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'

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
								<li><NavLink to="/createrecipe" >My Recipes</NavLink></li>
								<li><NavLink to="/createrecipe" >Create Recipe</NavLink></li>
								<li><NavLink to="/createrecipe" >Feeling Lucky</NavLink></li>
								<li>
                                    <input 
                                        type="text"
                                        className="input"
                                        placeholder=" Search for Recipes"
                                    />
                                </li>
							</ul>
						</nav>
				</header>
			</div>
        );
    }
}

export default Header;