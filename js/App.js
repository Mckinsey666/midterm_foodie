import React from 'react';
import LoginPage from './LoginPage';
import Blog from './Blog';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
    state = {
        loggedIn: false,
        username: "",
        warning: false
    }

    loginRef = React.createRef();

    onLogin = () => {
        const username = this.loginRef.current.textRef.current.state.value;
        if(username != ""){
            this.setState({
                loggedIn: true,
                username: username,
                warning: false
            })
        }
        else{
            this.setState({
                warning: true
            })
        }
    }

    onLogout = () => {
        this.setState({
            loggedIn: false
        })
    }

    render(){
        console.log(this.state);
        return (
            this.state.loggedIn ? 
                <BrowserRouter><Blog onLogout={this.onLogout} username={this.state.username}/></BrowserRouter> : 
                <LoginPage ref={this.loginRef} warning={this.state.warning} onLogin={this.onLogin}/>
        );
    }
}

export default App;