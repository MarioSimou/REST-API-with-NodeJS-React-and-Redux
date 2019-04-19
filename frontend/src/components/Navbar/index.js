import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const Navbar = props => {
    return (
        <div className="nav">
            <div className="left d-flex justify-content-center align-items-center">
                <div>
                    <i className="fas fa-code"></i>
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
                <div className="field">
                    <Link to="/login">Login</Link>
                </div>
                <div className="field">
                    <Link to="/register">Register</Link>
                </div>
                <div className="field">
                    <Link to="/logout">Logout</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar