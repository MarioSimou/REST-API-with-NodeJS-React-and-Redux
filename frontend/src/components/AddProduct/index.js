import React from 'react'
import Header from '../Header'
import u from '../../util'
import v from '../../util/validation'
import { Field, reduxForm  } from 'redux-form'
import './style.css'

const AddProduct = props => {
    const { handleSubmit } = props 
    const onSubmitForm = values => {
        console.log('submitting form')
    }
    return (
        <div className="add-product">
            <Header title="Add Product"
                content="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."
                id="add-product-header"
            />
            <div className="container-fluid p-0 m-0 d-flex justify-content-center align-items-center" id="add-product-form-container">
                <div className="container py-4">
                    <div className="add-product-form d-flex justify-content-center align-items-start">
                        <form className="form w-100" onSubmit={ handleSubmit( onSubmitForm ) } noValidate>
                            <Field
                                name="productName"
                                type="input"
                                label="Product Name"
                                placeholder="e.g Coca-cola"
                                component={u.customInput}
                            />
                            <Field
                                name="productPrice"
                                type="number"
                                label="Price"
                                component={u.customInput}
                            />
                            <Field
                                name="productImage"
                                type="text"
                                label="Product Image"
                                placeholder="e.g https://imagepath.com"
                                component={u.customInput}
                            />
                            <Field
                                name="productDesc"
                                type="textarea"
                                label="Product Description"
                                placeholder="Give a brief description of the product..."
                                component={ u.customInput}
                            />
                            <div className="form-group">
                                <button type="submit" className="btn btn-info btn-block">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default reduxForm({ form: 'add-product' , validate : v.validateAddProduct.bind( { _isItFilled : v._isItFilled } )  })(AddProduct)