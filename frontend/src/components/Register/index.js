import React from 'react'
import {  Field , reduxForm } from 'redux-form'
import u from '../../util'
import v from '../../util/validation/index'
import './style.css'
import api from '../../config/api'
import qs from 'qs'
import history from '../../config/history'
import { updateMessage } from '../../actions'
import { connect } from 'react-redux'


const Register = ({ updateMessage , handleSubmit , message  }) => {
    // routine that decides if an error/success message will be shown
    const msgJSX = u.renderMessage( message )
    const onSubmitForm = async values => {
        // POST /register , Content-Type : x-www-form-urlencoded
        const { data : { statusCode , res , error } } = await api.post( '/register' , qs.stringify( values ) )
        
        // process response
        switch( +statusCode ){
            case 200:
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
            <div className="register d-flex flex-column justify-content-center align-items-center">
                <div className="registration-form w-40">
                    <form className="form w-100" onSubmit={ handleSubmit( onSubmitForm) } noValidate>
                        <Field name="username" 
                               type="text"
                               component={ u.customInput } 
                               label="Username"
                               placeholder="username"
                               />
                        <Field
                                name="email"
                                type="text"
                                component={ u.customInput }
                                label="Email"
                                placeholder="e.g name@gmail.com"
                                />
                        <Field 
                                name="password"
                                type="password"
                                component={ u.customInput }
                                label="Password"
                                pattern=".{8,}"
                        />
                        <Field 
                                name="confPassword"
                                type="password"
                                component={ u.customInput }
                                label="Confirm Password"
                                pattern=".{8,}"
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

export default connect( mapStateToProps , { updateMessage } )( reduxForm(  { form : 'register' , validate : v.validateRegistration  })(Register ) )