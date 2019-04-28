import React from 'react'
import u from '../../util'
import './style.css'
import qs from 'qs'
import api from '../../config/api'
import { connect } from 'react-redux'
import { updateMessage } from '../../actions'
import history from '../../config/history'

// components
import Header from '../Header'
import ProductForm from '../ProductForm'

const AddProduct = ({  message , updateMessage , userId }) => {
    const msgJSX = u.renderMessage( message )
    
    const onSubmitFormCall = async values => {
        console.log(values )
        if( !userId ){
            updateMessage( { content : 'Login so we identify your identity.' , state : 'negative' } )
            return
        }
        // POST /products , Content-Type: x-www-form-urlencoded
        const { data: { statusCode, res, error } } = await api.post('/products', qs.stringify( { ...values , id : userId ,  }))

        // process the response
        switch ( statusCode) {
            case 200:
                // redirects to home page
                history.push('/')
                // updates message 
                updateMessage( res )
                break;
            default:
                // updates message 
                updateMessage( error )
                break;
        }
    }

    return (
        <React.Fragment>
            { msgJSX }
            <div className="add-product">
                <Header title="Add Product"
                    content="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
                    id="add-product-header"
                />
                <div className="container-fluid p-0 m-0 d-flex justify-content-center align-items-center" id="add-product-form-container">
                    <div className="container py-1">
                        <ProductForm 
                            id="add-product"
                            onSubmitFormCall={ onSubmitFormCall } 
                            initialValues={ { productPrice : 0 }}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
}


const mapStateToProps = state => {
    return { message : state.messageReducer , userId : state.userStatus}
}

export default connect(mapStateToProps, { updateMessage })(AddProduct)