import React from 'react'
import u from '../../util'
import './style.css'
import { connect } from 'react-redux'
import { updateMessage , addProduct } from '../../actions'
// components
import Header from '../Header'
import ProductForm from '../ProductForm'

const AddProduct = ({  message , updateMessage , addProduct , userId }) => {
    const msgJSX = u.renderMessage( message )
    
    const onSubmitFormCall = async values => {
        if( !userId ){
            updateMessage( { content : 'Login so we identify your identity.' , state : 'negative' } )
            return
        }
        // adding product
        addProduct( { ...values , id : userId }  )
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

export default connect(mapStateToProps, { updateMessage , addProduct })(AddProduct)