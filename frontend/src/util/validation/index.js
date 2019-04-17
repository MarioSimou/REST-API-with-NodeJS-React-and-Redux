import u from '../index'

export default (() => ({
    validateRegistration : function( values ){
        let errors = {}

        if( Object.keys( values ).length !== 4 ){
            for( let v of ['username' , 'email' , 'password' , 'confPassword']){

                if( !u.hasValue( values[ v ] )) errors[ v ] = 'Fill the field to continue.'
            }
        }

        ['password' , 'confPassword'].forEach( v => {
            const p = values[ v ]
            if( !/.{8,}/.test( p ) ) errors[ v ] = 'The password should be more than 8 characters.'

            switch( v ){
                case 'password':
                    if( p !== values['confPassword'] ) errors[ v ] = 'Passwords do not match.'
                    break;
                default:
                    if( p !== values['password'] ) errors[ v ] = 'Passwords do not match.'
                    break;
            }
        })

        return errors
    },
    validateLogin : function( values ){
        let errors = {}
        
        for( let v of [ 'email' , 'password' ]){
            if( !u.hasValue( values[ v ] )) errors[ v ] = 'Fill the field to continue.'
        }

        if( !/.{8,}/.test( values['password'] ) ) errors['password'] = 'The password should be more than 8 characters.'

        return errors
    }
}))()