import React from 'react';
import HomePage from './HomePage';
import { BrowserRouter}  from 'react-router-dom';
import CreateRecipePage from './CreateRecipePage';

class App extends React.Component {
    render(){
        return(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
    }
}

export default App;