import React from 'react'
import { Switch , BrowserRouter , Route } from 'react-router-dom'

// components
import Home from '../Home'
import Login from '../Login'
import Navbar from '../Navbar'
import Register from '../Register'
import AddProduct from '../AddProduct'

const App = props => {
    return(
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/products/new" component={  AddProduct } />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App