import React from 'react'
import u from '../../util'
import v from '../../util/validation'
import { Field, reduxForm } from 'redux-form'
import './style.css'
import qs from 'qs'
import api from '../../config/api'
import { connect } from 'react-redux'
import { updateMessage } from '../../actions'
import history from '../../config/history'

// components
import Header from '../Header'

const AddProduct = ({ handleSubmit , message , updateMessage , userId }) => {
    const msgJSX = u.renderMessage( message )
    const dropDownOptions = {
        'Select a category': '',
        'Fashion': 'Fashion',
        'Electronics': 'Electronics',
        'Books': 'Books',
        'Home & Garden': 'Home & Garden',
        'Accessories': 'Accessories',
        'Furniture': 'Furniture'
    }

    const onSubmitForm = async values => {
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
                        <div className="add-product-form d-flex justify-content-center align-items-start">
                            <form className="form w-100" onSubmit={handleSubmit(onSubmitForm)} noValidate>
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
                                    name="productCategory"
                                    options={dropDownOptions}
                                    component={u.customDropdown}
                                />
                                <Field
                                    name="productDesc"
                                    type="textarea"
                                    label="Product Description"
                                    placeholder="Give a brief description of the product..."
                                    component={u.customInput}
                                />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-info btn-block">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
}


const mapStateToProps = state => {
    return { message : state.messageReducer , userId : state.userStatus}
}

export default connect(mapStateToProps, { updateMessage })(reduxForm({ form: 'add-product', validate: v.validateAddProduct.bind({ _isItFilled: v._isItFilled }) })(AddProduct))