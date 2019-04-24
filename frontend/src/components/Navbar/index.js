import React , { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {  userLogin , updateMessage } from '../../actions'
import u from '../../util'
import './style.css'


const Navbar = ({  userId  , userLogin , updateMessage }  ) => {
    // checks if the user has a token and verifies it
    useEffect( () =>  { userLogin( u.findPayload( window.localStorage.getItem('token')) )} , [])

    const renderAuth = ( id ) => {
        switch( id ? true : false ){
            case true:
                return (
                    <div className="field">
                        <Link to="#" 
                              onClick={ () => u.logout( { userLogin , updateMessage } ) }
                        >Logout</Link>
                    </div>
                )
            default:
                return (
                    <React.Fragment>
                        <div className="field">
                            <Link to="/login">Login</Link>
                        </div>
                        <div className="field">
                            <Link to="/register">Register</Link>
                        </div>
                    </React.Fragment>
                )
        }
    } 

    return (
        <div className="nav">
            <div className="left d-flex justify-content-center align-items-center">
                <div>
                    <i className="fab fa-product-hunt"></i>
                </div>
            </div>
            <div className="center d-flex justify-content-start align-items-center">
                <div className="field">
                    <Link to="/">Home</Link>
                </div>
                <div className="field">
                    <Link to="/products/new">Add Product</Link>
                </div>
            </div>
            <div className="right d-flex justify-content-end align-items-center">
               { renderAuth( userId ) }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { userId : state.userStatus }
}

export default  connect( mapStateToProps  , { userLogin , updateMessage })( Navbar )