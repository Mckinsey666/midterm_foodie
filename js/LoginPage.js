import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PopOutText from './containers/PopOutText';


const styles = {
    button: {
        marginLeft: "auto", 
        width: '35%', 
        fontWeight: "0.5",
        color: "rgb(141, 141, 142)",
    },
    message: {
        color: "white"
    },
    username: {
        marginLeft: "0.5em",
        fontSize: "2em"
    }
}
class TextWrapper extends React.Component {
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
            <div style={{width: '60%'}}>
                <TextField
                    style={{width: '100%'}}
                    label="Enter Username"
                    variant="outlined"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

class LoginPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            popout: false,
        }
        this.textRef = React.createRef();
    }

    handleClick = () => {
        this.props.onLogin();
    };

    showPopUp = () => {
        this.setState({
            popout: true
        })
    }

    hidePopUp = () => {
        this.setState({
            popout: false
        })
    }


    render(){
        return(
            <div>
                <div onClick={this.showPopUp} className="title-container">Foodie</div>
                <div className="input-field">
                    <TextWrapper ref={this.textRef}/>
                    <Button 
                        variant="contained" 
                        style={styles.button}
                        onClick={this.handleClick}
                    >
                        Login
                    </Button>
                    <PopOutText open={this.state.popout} handleClose={this.hidePopUp}/>
                </div>
            </div>
        );
    }
}

export default LoginPage;