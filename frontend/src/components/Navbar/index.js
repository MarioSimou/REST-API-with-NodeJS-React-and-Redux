import React , { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {  userLogin } from '../../actions'
import './style.css'

const findPayload = () => {
    const token = window.localStorage.getItem('token')
    return token ? JSON.parse( atob( token.split('.')[1] ) ) : {}
}


const Navbar = ({  userLogin , user : { id } }) => {
    // useEffect(() => {
    //     console.log('id:' , id , '\tpayload' , findPayload().id )
    //     // if( id !== findPayload().id ){
    //     //     console.log('executed')
    //     //     userLogin( findPayload() )
    //     // }
    // })

    const renderAuth = ( id ) => {
        switch( id ? true : false ){
            case true:
                return (
                    <div className="field">
                        <Link to="/logout">Logout</Link>
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
               { renderAuth( id ) }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return { user : state.authReducer }
}

export default connect( mapStateToProps  , { userLogin })( Navbar )