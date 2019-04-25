import React  from 'react'
import { Switch , Router , Route } from 'react-router-dom'
import history from '../../config/history'
import { connect } from 'react-redux'

// components
import Home from '../Home'
import Login from '../Login'
import Navbar from '../Navbar'
import Register from '../Register'
import AddProduct from '../AddProduct'

const App = ({ userId  })  => {
    return(
        <div className="app">
            <Router history={ history } >
                <Navbar />
                <Switch>
                    <Route exact path="/" component={ Home } />
                    <Route exact path="/login" component={ Login } />
                    <Route exact path="/register" component={ Register } />
                    <Route exact path="/products/new" component={  AddProduct } />
                </Switch>
            </Router>
        </div>
    )
}

const mapStateToProps = state => {
    return {  userId : state.userStatus }
}

export default connect( mapStateToProps , {} )(App)