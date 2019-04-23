import * as t from '../actions/types'

const authReducer = ( state = {} , action ) => {
    switch( action.type ){
        case t.USER_LOGIN:
            return { ...state , ...action.payload }
        default:
            return state
    }
}

export { authReducer }