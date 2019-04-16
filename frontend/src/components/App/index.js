import React from 'react'
import { Switch , BrowserRouter , Route } from 'react-router-dom'

// components
import Home from '../Home'
import Login from '../Login'
import Navbar from '../Navbar'
import Register from '../Register'

const App = props => {
    return(
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/register" component={ Register } />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App