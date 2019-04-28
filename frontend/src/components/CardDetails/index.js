import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const CardDetails = ({ product : { category , description , price , product_image , product_name , email  } }) => {

    const toggleDetailsClass = e => {
        let { target } = e
        switch( target.tagName.toLowerCase() ){
            case 'li':
                target = target.querySelector('div:last-child')
                break;
            case 'div':
                if( !target.classList.contains('info'))
                    target = target.nextElementSibling
                break;
            default:
                break;
        }
        target.classList.toggle('hide') // alters the product details
        target.previousElementSibling.classList.toggle('div-active') // alters the product header
    }
    
    return (
        <div className="container">
                <div className="header">
                    <img src={ product_image } alt={ product_name } />
                </div>
                <div className="body">
                    <ul>
                        <li onClick={ e => toggleDetailsClass( e )} >
                            <div className={ `div-active` }>Name</div>
                            <div className={ `info` }>{product_name }</div>
                        </li>
                        <li onClick={ e => toggleDetailsClass( e )}>
                            <div>Category</div>
                            <div className={ `info hide` } >{ category }</div>
                        </li>
                        <li onClick={ e => toggleDetailsClass( e )}>
                            <div>Price</div>
                            <div className={ `info hide` } >{ price }</div>
                        </li>
                        <li onClick={ e => toggleDetailsClass( e )}>
                            <div>Added by</div>
                            <div className={ `info hide` }>{ email }</div>    
                        </li>
                        <li onClick={ e => toggleDetailsClass( e )}>
                            <div>Description</div>
                            <div className={ `info hide` }>{ description }</div>
                        </li>
                    </ul>
                </div>
                <div className="footer d-flex justify-content-end">
                    <Link to="/" 
                          className="btn btn-outline-info"
                    ><i className="fas fa-home"></i></Link>
                </div>
            </div>
    )
}

export default CardDetails