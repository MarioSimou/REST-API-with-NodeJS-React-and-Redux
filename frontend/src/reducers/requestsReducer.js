import * as t from '../actions/types'

const requestsReducer = ( state = {} , action ) => {
    switch( action.type ){
        case t.FETCH_PRODUCTS:
            return { ...state , ...action.payload.products }
        default:
            return state
    }    
}

export { requestsReducer }