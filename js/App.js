import React from 'react';
import LoginPage from './LoginPage';
import Blog from './Blog';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
    state = {
        loggedIn: false,
        username: ""
    }

    loginRef = React.createRef();

    onLogin = () => {
        this.setState({
            loggedIn: true,
            username: this.loginRef.current.textRef.current.state.value,
        })
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
                <LoginPage ref={this.loginRef} onLogin={this.onLogin}/>
        );
    }
}

export default App;