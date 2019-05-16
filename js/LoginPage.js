import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PopOutText from './containers/PopOutText';
import Snackbar from '@material-ui/core/Snackbar';
const sjcl = require('sjcl');


const styles = {
    registerbutton: {
        marginLeft: "auto", 
        width: '35%', 
        fontWeight: "0.5",
        backgroundColor: "rgb(198, 198, 198)",
        color: "rgb(255, 255, 255)",
    },
    loginbutton: {
        marginLeft: "auto", 
        width: '35%', 
        fontWeight: "0.5",
        color: "rgb(140, 137, 137)",
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
            <div className="animated bounceInLeft delay-2s" style={{width: '60%'}}>
                <TextField
                    style={{width: '100%'}}
                    label={this.props.placeholder}
                    variant="outlined"
                    type={this.props.password ? 'password' : 'text'}
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
            warning: false,
            warningMessage: "Username / password field should not be empty!" 
        }
        this.userRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    guardInput = () => {
        const user = this.userRef.current.state.value;
        const password = this.passwordRef.current.state.value;
        let success = true;
        if(user == "" || password == ""){
            this.setState({
                warning: true,
                warningMessage: "Username / password field should not be empty!",
            })
            success = false;
        }
        return [user, password, success];
    } 


    closeSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            warning: false
        })
    };

    handleLogin = () => {
        let user, password, success, login = true;
        [user, password, success] = this.guardInput();
        if(!success) return;
        const hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password));
        console.log(hash);
        this.callLoginBackend({user: user, password: hash})
            .then(res => {
                console.log(res.content);
                if(res.warning){
                    this.setState({
                        warning: res.warning,
                        warningMessage: res.content,
                    })
                    login = false;
                }
                else this.props.onLogin(user);
            })
            .catch(err => console.log(err));
    };

    handleRegister = () => {
        let user, password, success;
        [user, password, success] = this.guardInput();
        const hash = sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(password));
        console.log(hash);
        if(!success) return;
        this.callRegisterBackend({user: user, password: hash})
            .then(res => {
                if(res.warning){
                    this.setState({
                        warning: res.warning,
                        warningMessage: res.content,
                    })
                }
                console.log(res.content);
            })
            .catch(err => console.log(err));
    }

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

    callRegisterBackend = async data => {
        const payload = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
        };
        

        const response = await fetch('/register', payload);
		const body = await response.json();

		if (response.status !== 200) {
				throw Error(body.message) 
			}
		return body;
    }

    callLoginBackend = async data => {
        const payload = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
        };

        const response = await fetch('/login', payload);
		const body = await response.json();

		if (response.status !== 200) {
				throw Error(body.message) 
			}
		return body;
    }

    render(){
        return(
            <div>
                <div onClick={this.showPopUp} 
                    className="title-container animated bounceIn delay-2s"
                >
                    Foodie
                </div>
                <div className="login-field">
                    <div className="input-field">
                        <TextWrapper password={false} placeholder="Enter Username" ref={this.userRef}/>
                        <Button 
                            variant="contained" 
                            className="animated bounceInRight delay-2s"
                            style={styles.registerbutton}
                            onClick={this.handleRegister}
                        >
                            Register
                        </Button>
                    </div>
                    <div className="input-field">
                        <TextWrapper password={true} placeholder="Enter Password" ref={this.passwordRef}/>
                        <Button 
                            variant="contained" 
                            className="animated bounceInRight delay-2s"
                            style={styles.loginbutton}
                            onClick={this.handleLogin}
                        >
                            Login
                        </Button>
                    </div>
                </div>
                <PopOutText open={this.state.popout} handleClose={this.hidePopUp}/>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    style={styles.snackbar}
                    open={this.state.warning}
                    autoHideDuration={3000}
                    onClose={this.closeSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span>{this.state.warningMessage}</span>}
                />
            </div>
        );
    }
}

export default LoginPage;