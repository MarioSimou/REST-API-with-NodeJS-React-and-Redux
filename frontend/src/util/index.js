import React from 'react'
import Message from '../components/Message'

export default (() => ({
    // routine that checks and identifies if a datatype has a value
    hasValue: function (v) {
        switch (Object.prototype.toString.call(v)) {
            case '[object Array]':
            case '[object String]':
                return v.length > 0 ? true : false
            case '[object Number]':
                return Number(v).toString().length > 0 ? true : false
            case '[object Object]':
                return Object.values(v).length > 0 ? true : false
            case '[object Undefined]':
            case '[object Null]':
                return false
            default:
                return null
        }
    },
    // custom input that is used with reduxForm.
    customInput: ({ input, meta, label, placeholder, type, pattern , autocomplete }) => {
        const { name } = input
        const { touched, error } = meta

        switch (touched) {
            case true:
                const validFeedback = error ? <div className="invalid-feedback">{error}</div> : ''

                switch (type) {
                    case 'textarea':
                        return (
                            <div className="form-group">
                                <label htmlFor={name}>{label}</label>
                                <textarea
                                    {...input}
                                    className={`form-control ${error ? 'is-invalid' : 'is-valid'}`}
                                    id={name}
                                    name={name}
                                    rows="4"
                                    placeholder={placeholder}
                                    autoComplete={ autocomplete }
                                    required
                                >
                                </textarea>
                                {validFeedback}
                            </div>
                        )
                    default:
                        return (
                            <div className="form-group">
                                <label htmlFor={name}>{label}</label>
                                <input {...input}
                                    type={`${type}`}
                                    id={name}
                                    name={name}
                                    className={`form-control ${error ? 'is-invalid' : 'is-valid'}`}
                                    placeholder={`${placeholder ? placeholder : ''} `}
                                    pattern={`${pattern ? pattern : null}`}
                                    autoComplete={ autocomplete }
                                    required
                                />
                                {validFeedback}
                            </div>
                        )
                }
            default:
                switch (type) {
                    case 'textarea':
                        return (
                            <div className="form-group">
                                <label htmlFor={name}>{label}</label>
                                <textarea
                                    {...input}
                                    className="form-control"
                                    id={name}
                                    name={name}
                                    rows="4"
                                    placeholder={placeholder}
                                    autoComplete={ autocomplete }
                                    required
                                >
                                </textarea>
                            </div>
                        )
                    default:
                        return (
                            <div className="form-group">
                                <label htmlFor={name}>{label}</label>
                                <input {...input}
                                    type={`${type}`}
                                    id={name}
                                    name={name}
                                    className="form-control"
                                    placeholder={`${placeholder ? placeholder : ''} `}
                                    pattern={`${pattern ? pattern : null}`}
                                    autoComplete={ autocomplete }
                                    required
                                />
                            </div>
                        )
                }
        }
    },
    customDropdown: function ({ input, meta, options }) {
        const { name } = input
        const { touched, error } = meta
        switch (touched) {
            case true:
                const invalidFeedback = error ? <div className="invalid-feedback">Please select a category</div> : ''
                return (
                    <div className="form-group">
                        <select className={ `custom-select ${ error ? 'is-invalid' : 'is-valid' }`}
                            {...input}
                            name={name}
                            id={name}
                            required>
                            {Object.entries(options).map(v => {
                                return (<option key={v[1]} value={v[1]}>{v[0]}</option>)
                            })}
                        </select>
                        {invalidFeedback}
                    </div>
                )
            default:
                return (
                    <div className="form-group">
                        <select className="custom-select"
                            {...input}
                            name={name}
                            id={name}
                            required>
                            {Object.entries(options).map(v => {
                                return (<option key={v[1]} value={v[1]}>{v[0]}</option>)
                            })}
                        </select>
                    </div>
                )
        }
    },
    renderMessage : ({ content , state } ) => {
        return content && state  ? <Message content={ content } state={ state }  /> : <div></div> 
    },
    // finds the payload of a given token 
    findPayload : token  => {
        return token ? JSON.parse( atob( token.split('.')[1] ) ) : {}
    },
    // logout a user from the system
    logout : ({ userLogin , updateMessage }) => {
        // resets the token
        userLogin({})
        updateMessage({ content : 'You have successfully log out' , state : 'positive' })
        window.localStorage.removeItem('token')
    }
}))()
