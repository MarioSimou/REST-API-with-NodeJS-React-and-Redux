import React from 'react'
import u from '../../util'
import v from '../../util/validation'
import { Field, reduxForm } from 'redux-form'


const ProductForm = ({ handleSubmit, onSubmitFormCall , id }) => {
    const dropDownOptions = {
        'Select a category': '',
        'Fashion': 'Fashion',
        'Electronics': 'Electronics',
        'Books': 'Books',
        'Home & Garden': 'Home & Garden',
        'Accessories': 'Accessories',
        'Furniture': 'Furniture'
    }

    const onSubmitForm = values  => {
        onSubmitFormCall( values )
    }

    return (
        <div className={ `${ id }-form d-flex justify-content-center align-items-start` }>
            <form className="form w-100"
                onSubmit={handleSubmit(onSubmitForm)}
                noValidate>
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
    )
}



export default reduxForm(
    {
        form: 'product-form',
        validate: v.validateAddProduct.bind({ _isItFilled: v._isItFilled })
    })(ProductForm)