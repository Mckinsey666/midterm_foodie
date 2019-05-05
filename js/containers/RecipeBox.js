import React from 'react';

const styles = {
	box: {
		height: "400px",
	}
}
class RecipeBox extends React.Component {
    render(){
        return(
            <div className="col-4 col-12-medium">
			    <section className="box feature">
					<a href="#" className="image featured"><img src={this.props.item.img} alt="" /></a>
					<div style={styles.box} className="inner">
						<header>
							<h2>{this.props.item.title}</h2>
							<a href={this.props.item.link}><img src="/public/images/tasty-logo.png" /></a>
						</header>
						<p>Phasellus quam turpis, feugiat sit amet in, hendrerit in lectus. Praesent sed semper amet bibendum tristique fringilla.</p>
					</div>
				</section>
			</div>
        );
    }
}

export default RecipeBox;