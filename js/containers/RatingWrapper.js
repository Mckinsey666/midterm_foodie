import React from 'react';
import Rating from './Rating';


class RatingWrapper extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            stars: 0
        }
    }

    onChange = i => {
        this.setState({
            stars: i
        })
    };

    render(){
        return(
            <Rating
                value={this.state.stars}
                max={5}
                onChange={i => this.onChange(i)}
            />
        );
    }
}


export default RatingWrapper;
