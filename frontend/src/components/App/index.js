import React from 'react'
import { Switch , BrowserRouter , Route } from 'react-router-dom'

// components
import Home from '../Home'
import Login from '../Login'
import Navbar from '../Navbar'

const App = props => {
    return(
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/login" component={ Login } />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App