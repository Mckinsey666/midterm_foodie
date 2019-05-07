import React from 'react';
import CreateRecipePage from '../CreateRecipePage';
import { NavLink, Switch, Route } from 'react-router-dom'

const styles = {
	banner: {
		fontSize: "2em",
	}
}

class Banner extends React.Component {
    render(){
        return(
                <div id="banner-wrapper">
					<div id="banner" className="box container">
						<div className="row">
							<div className="col-7 col-12-medium">
								<h2>This is Foodie.</h2>
								<p>Find recipes, cook-alongs, or create your own dishes!</p>
							</div>
							<div className="col-5 col-12-medium">
								<ul>
									<li>
										<NavLink 
											className="button large"
											to="/createrecipe" 
											style={styles.banner}
										>
											Create A Recipe
										</NavLink>
									</li>
									<li>
										<NavLink 
											className="button alt large"
											to="/feelinglucky" 
											style={styles.banner}
										>
											Feeling Lucky
										</NavLink>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
        );
    }
}

export default Banner;