import React from 'react';
import HomePage from './HomePage';
import { BrowserRouter}  from 'react-router-dom';
import CreateRecipePage from './CreateRecipePage';
import RandomRecipePage from './RandomRecipePage';

class App extends React.Component {
    render(){
        return(
            <BrowserRouter>
                <RandomRecipePage />
            </BrowserRouter>
        );
    }
}

export default App;