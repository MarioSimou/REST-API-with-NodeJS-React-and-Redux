import React , { useEffect } from 'react'
import u from '../../util'
import './style.css'
import qs from 'qs'
import api from '../../config/api'
import { connect } from 'react-redux'
import { updateMessage , fetchProduct } from '../../actions'
import history from '../../config/history'

// components
import Header from '../Header'
import ProductForm from '../ProductForm'

const EditProduct = ({  match , message , updateMessage , userId , fetchProduct , product }) => {
    const msgJSX = u.renderMessage( message )
    const { id } = match.params
    const { category , description , price , product_image , product_name } = product
    const initialValues = { 
        productName : product_name,
        productPrice : price,
        productCategory: category,
        productImage :  product_image,
        productDesc : description
    }
    
    const onSubmitFormCall = async values => {
        if( !userId ){
            updateMessage( { content : 'Login so we identify your identity.' , state : 'negative' } )
            return
        }
        // PUT /products/productId , Content-Type: x-www-form-urlencoded
        const { data: { statusCode, res, error } } = await api.put(`/products/${ id }`, qs.stringify( { ...values , id : userId  }))

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
    
    useEffect( ()=> { fetchProduct( id ) }, [ id ] )

    return (
        <React.Fragment>
            { msgJSX }
            <div className="edit-product">
                <Header title="Edit Product"
                    content="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
                    id="edit-product-header"
                />
                <div className="container-fluid p-0 m-0 d-flex justify-content-center align-items-center" id="edit-product-form-container">
                    <div className="container py-1">
                        <ProductForm 
                            id="edit-product"
                            onSubmitFormCall={ onSubmitFormCall } 
                            initialValues={ initialValues }
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
}


const mapStateToProps = ( state , prevProps ) => {
    const { id } = prevProps.match.params
    const products  = state.requestsReducer
    return { product : products && Object.values( products ).length > 0 ? products[id] : {} , message : state.messageReducer , userId : state.userStatus }
}

export default connect(mapStateToProps, { updateMessage , fetchProduct })(EditProduct)