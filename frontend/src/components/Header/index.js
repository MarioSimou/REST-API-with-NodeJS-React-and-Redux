import React from 'react'
import './style.css'

const Header = ({ title, content , id  }) => {
    return (
        <div className="container-fluid p-0 m-0 header-container" id={ id } >
            <div className="d-flex flex-column justify-content-center align-items-center p-4">
                <div className="display-3">{ title }</div>
                <div className="content">
                    <p>{ content }</p>
                </div>
                <div className="buttons-container">
                    <div className="btn btn-outline-info mr-2 mr-lg-3">Home</div>
                    <div className="btn btn-outline-info">Home</div>
                </div>
            </div>
        </div>
    )
}

export default Header