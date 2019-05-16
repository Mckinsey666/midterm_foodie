import React from 'react';
import LoginPage from './LoginPage';
import Blog from './Blog';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
    state = {
        loggedIn: true,
        username: ""
    }

    onLogin = username => {
        this.setState({
            loggedIn: true,
            username: username
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
                <LoginPage onLogin={this.onLogin}/>
        );
    }
}

export default App;