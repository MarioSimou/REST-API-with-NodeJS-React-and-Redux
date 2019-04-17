import React from 'react'
import {  Field , reduxForm } from 'redux-form'
import util from '../../util'
import './style.css'

const input = ({ input , meta , label , placeholder , type , pattern }) => {
    const { name } = input
    const { touched , error } = meta

    switch( touched ){
        case true:
            const validFeedback = error ? <div className="invalid-feedback">{ error }</div> : ''
            return (
                <div className="form-group">
                    <label htmlFor={ name }>{ label }</label>
                    <input { ...input } 
                        type={ `${ type }` } 
                        id={ name } 
                        name={ name } 
                        className={ `form-control ${ error ? 'is-invalid' : 'is-valid' }` }
                        placeholder={ `${ placeholder ? placeholder : '' } ` }
                        pattern={ `${ pattern ? pattern : null }`}
                        required
                    />
                    { validFeedback }
                </div>
                )
        default:
            return (
                <div className="form-group">
                <label htmlFor={ name }>{ label }</label>
                <input { ...input } 
                    type={ `${ type }`} 
                    id={ name } 
                    name={ name } 
                    className="form-control"
                    placeholder={ `${ placeholder ? placeholder : '' } ` }
                    pattern={ `${ pattern ? pattern : null }`}
                    required
                />
                </div> 
            )
    }
}

const Register = props => {
    const { handleSubmit } = props
    const onSubmitForm = values => {
        // backend functionality that runs with the API
    }

    return (
        <div className="register d-flex justify-content-center align-items-center">
                <div className="registration-form w-50">
                    <form className="form w-100" onSubmit={ handleSubmit( onSubmitForm) } noValidate>
                        <Field name="username" 
                               type="text"
                               component={ input } 
                               label="Username"
                               placeholder="username"
                               />
                        <Field
                                name="email"
                                type="text"
                                component={ input }
                                label="Email"
                                placeholder="e.g name@gmail.com"
                                />
                        <Field 
                                name="password"
                                type="password"
                                component={ input }
                                label="Password"
                                pattern=".{8,}"
                        />
                        <Field 
                                name="confPassword"
                                type="password"
                                component={ input }
                                label="Confirm Password"
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

const validate = values => {
    let errors = {}
    const k = Object.keys( values )

    // identifies unfilled fields
    if( k.length !== 4){
        for( let v of ['username' , 'email' , 'password' , 'confPassword'] ){
            if( !util.hasValue( values[ v ] ) ){
                errors[ v ] = `Fill the value of ${ v }`
            }
        }
    }

    // Compare Passwords functionality
    ['password' , 'confPassword'].forEach(( v ,i , a ) => {
        const p = values[v]

        if( !/.{8,}/.test( p )) errors[ v ] = 'Password should be more than 8 characters.'
        switch( v ){
            case 'password':
                if( p !== values[a[i+1]])  errors[ v ] = 'Passwords do not match.'
                break;
            default:
                if( p !== values[a[0]])  errors[ v ] = 'Passwords do not match.'
                break;
        }
    })

    return errors
}

export default reduxForm(  { form : 'register' , validate  })(Register )