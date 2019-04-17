import React from 'react'
import {  Field , reduxForm } from 'redux-form'
import util from '../../util'
import './style.css'

const input = ({ input , meta , label , placeholder , type , pattern }) => {
    const { name } = input
    const { touched , error } = meta
    console.log(pattern)
    switch( touched ){
        case true:
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
                </div>
                )
            break;
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
        console.log( 'submitting form');
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
                                pattern=".{8.,}"
                        />
                        <Field 
                                name="confPassword"
                                type="password"
                                component={ input }
                                label="Confirm Password"
                                pattern=".{8.,}"
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

    if( k.length !== 4){
        for( let v of ['username' , 'email' , 'password' , 'confPassword'] ){
            if( !util.hasValue( values[ v ] ) ){
                errors[ v ] = `Fill the value of ${ v }`
            }
        }
    }
    // console.log(values)
    // Object.entries( values ).reduce( ( s , e )  => {
    //         const [ k , v ] = e
    //         // more complicated check

    //         return s

    // },  errors )
    console.log(errors)
    return errors
}

export default reduxForm(  { form : 'register' , validate  })(Register )