import u from '../index'


export default (() => ({
    // private routine that returns an error object of those fields that do not have a value
    _isItFilled : function (a, v) {
        let errors = {}

        for (let i of a) {
            if (!u.hasValue(v[i])) errors[i] = 'Fill the field to continue.'
        }

        return errors
    },
    // validation method when a user is registed 
    validateRegistration: function (values) {
        let errors = {}

        if (Object.keys(values).length !== 4) {
            for (let v of ['username', 'email', 'password', 'confPassword']) {

                if (!u.hasValue(values[v])) errors[v] = 'Fill the field to continue.'
            }
        }

        ['password', 'confPassword'].forEach(v => {
            const p = values[v]
            if (!/.{8,}/.test(p)) errors[v] = 'The password should be more than 8 characters.'

            switch (v) {
                case 'password':
                    if (p !== values['confPassword']) errors[v] = 'Passwords do not match.'
                    break;
                default:
                    if (p !== values['password']) errors[v] = 'Passwords do not match.'
                    break;
            }
        })

        return errors
    },
    // validation method when a user is logged in
    validateLogin: function (values) {
        let errors = {}

        for (let v of ['email', 'password']) {
            if (!u.hasValue(values[v])) errors[v] = 'Fill the field to continue.'
        }

        if (!/.{8,}/.test(values['password'])) errors['password'] = 'The password should be more than 8 characters.'

        return errors
    },
    // validation method when a product is submitted to the database
    validateAddProduct: function (values) {
        let errors = this._isItFilled(['productName', 'productPrice', 'productImage', 'productDesc'], values)
        return errors
    }
}))()
