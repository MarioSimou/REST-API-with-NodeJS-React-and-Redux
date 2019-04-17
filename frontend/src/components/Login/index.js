import React from 'react'
import {  Field , reduxForm } from 'redux-form'
import u from '../../util'
import v from '../../util/validation'
import './style.css'

const Login = props => {
    const { handleSubmit } = props
    const onSubmitForm = values => {
        // backend functionality that runs with the API
    }

    return (
        <div className="login d-flex justify-content-center align-items-center">
                <div className="login-form w-40">
                    <form className="form w-100" onSubmit={ handleSubmit( onSubmitForm) } noValidate>
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
                        <div className="form-group">
                            <button type="submit" className="btn btn-info btn-block">Info</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default reduxForm(  { form : 'register' , validate : v.validateLogin  })( Login )