import React from 'react'
import {  Field , reduxForm } from 'redux-form'
import u from '../../util'
import v from '../../util/validation'
import api from '../../config/api'
import history from '../../config/history'
import qs from 'qs'
import { connect } from 'react-redux'
import { updateMessage , userLogin  } from '../../actions'
import './style.css'

const Login = ({ handleSubmit , updateMessage , message ,  userLogin }) => {
    const msgJSX = u.renderMessage( message )

    const onSubmitForm = async values => {
        // POST /register , Content-Type : x-www-form-urlencoded
        const { data : { statusCode , res , error , token  } } = await api.post( '/login' , qs.stringify( values ) )
        
        // process response
        switch( +statusCode ){
            case 200:
                // stores the token to localStorage
                window.localStorage.setItem('token' , token )
                // dispatch a login action
                userLogin( u.findPayload( token ) )

                // redirects the user to home page 
                history.push('/' )
                updateMessage( res )
                break;
            default:
                updateMessage( error ) 
                break;
        }
    }

    return (
        <React.Fragment>
            { msgJSX }
            <div className="login d-flex justify-content-center align-items-center">
                <div className="login-form w-40">
                    <form className="form w-100" onSubmit={ handleSubmit( onSubmitForm) } noValidate>
                        <Field
                                name="email"
                                type="text"
                                component={ u.customInput }
                                label="Email"
                                placeholder="e.g name@gmail.com"
                                autocomplete="email"
                                />
                    <Field 
                                name="password"
                                type="password"
                                component={ u.customInput }
                                label="Password"
                                pattern=".{8,}"
                                autocomplete="new-password"
                        />
                        <div className="form-group">
                            <button type="submit" className="btn btn-info btn-block">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return { message : state.messageReducer }
}

export default connect( mapStateToProps , { updateMessage , userLogin } )( reduxForm(  { form : 'login' , validate : v.validateLogin  })( Login ) )
