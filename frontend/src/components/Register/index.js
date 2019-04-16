import React from 'react'
import './style.css'
const Register = props => {
    return (
        <div className="register d-flex justify-content-center align-items-center">
                <div className="registration-form w-50">
                    <form className="form w-100">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" 
                                   id="username" 
                                   name="username" 
                                   className="form-control" 
                                   placeholder="username"
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="text" 
                                   id="email" 
                                   name="email" 
                                   className="form-control" 
                                   placeholder="e.g email@gmail.com"
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" 
                                   id="password" 
                                   name="password" 
                                   className="form-control" 
                                   pattern=".{8,}"
                                   required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confPassword">Confirm Password</label>
                            <input type="text" 
                                   id="confPassword" 
                                   name="confPasswordl" 
                                   className="form-control"
                                   pattern=".{8,}"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-info btn-block">Info</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default Register