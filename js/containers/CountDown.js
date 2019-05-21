import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const delta = 1000;

const styles = {
}

function CardWrapper(props){
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        {props.value}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

class CountDown extends React.Component {
    state = {
        value: this.props.initial
    }

    componentDidMount(){
        this.interval = setInterval(() => this.setState(prevState => {
            const newValue = ((prevState.value > delta) ? prevState.value - delta : 0);
            this.props.onFinish(newValue);
            return {value: newValue};
        }), delta);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    parseValue = value => {
        let hr = 0,
            min = 0,
            sec = value / 1000;
        min += Math.floor(sec / 60);
        sec %= 60;
        hr += Math.floor(min / 60);
        min %= 60;
        return {h: hr, m: min, s: sec}
    }

    padZero = value => {
        return ((value < 10) ? ('0' + value.toString()) : value.toString())
    }

    render(){
        const time = this.parseValue(this.state.value);
        const timeString = this.padZero(time.h) + " : " + this.padZero(time.m) + " : " + this.padZero(time.s);
        return(
            <div style={{display: "flex"}}>
                <CardWrapper value={timeString} />
            </div>
        )
    }
}

export default CountDown;