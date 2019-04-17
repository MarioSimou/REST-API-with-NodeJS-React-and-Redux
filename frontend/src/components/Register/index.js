import React from 'react'
import {  Field , reduxForm } from 'redux-form'
import u from '../../util'
import v from '../../util/validation/index'
import './style.css'


const Register = props => {
    const { handleSubmit } = props
    const onSubmitForm = values => {
        // backend functionality that runs with the API
    }

    return (
        <div className="register d-flex justify-content-center align-items-center">
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
    )
}

export default reduxForm(  { form : 'register' , validate : v.validateRegistration  })(Register )