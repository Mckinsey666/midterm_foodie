import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = {
    textContainer: {
        display: "flex",
        width: '100%',
    },
    margin: {
        width: "5%",
    },
    innerContainer: {
        width: "30%"
    }
}

class TimeSelector extends React.Component {
	constructor(props){
	  super(props);
	  this.state = {
        hour: "",
        minute: "",
        second: "",
	  }
	}
  
	handleHourChange = event => {
        //const hour = parseInt(event.target.value);
        this.setState({
            hour: event.target.value,
        })
    }
    
    handleMinuteChange = event => {
        //const minute = parseInt(event.target.value);
        this.setState({
            minute: event.target.value,
        })
    }
    
    handleSecondChange = event => {
        //const second = parseInt(event.target.value);
        this.setState({
            second: event.target.value,
        })
	}
  
	render(){
	  return(
		<div style={styles.textContainer}>
            <TextField
                value={this.state.hour}
                onChange={this.handleHourChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">hr</InputAdornment>,
                  }}
                style={styles.innerContainer}
            />
            <div style={styles.margin}></div>
            <TextField
                value={this.state.minute}
                onChange={this.handleMinuteChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">min</InputAdornment>,
                  }}
                style={styles.innerContainer}
            />
            <div style={styles.margin}></div>
            <TextField
                value={this.state.second}
                onChange={this.handleSecondChange}
                InputProps={{
                    endAdornment: <InputAdornment position="end">sec</InputAdornment>,
                  }}
                style={styles.innerContainer}
            />
      </div>
	  );
	}
  }

export default TimeSelector;