import * as t from '../actions/types'

const messageReducer = ( state = {} , action ) => {
    switch( action.type ){
        case t.UPDATE_MESSAGE :
            return { ...state , ...action.payload }
        default:
            return state
    }
}


export { messageReducer }