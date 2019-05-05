import React from 'react';

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
								<li><a href="#">My Recipes</a></li>
								<li><a href="#">Create Recipe</a></li>
								<li><a href="#">Feeling Lucky</a></li>
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