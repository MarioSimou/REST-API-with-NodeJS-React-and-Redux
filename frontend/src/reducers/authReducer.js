import * as t from '../actions/types'

const userStatus = ( state = null , action ) => {
    switch( action.type){
        case t.USER_LOGIN:
            console.log('inside 3')
            return action.payload.id
        default:
            return state
    }
}

export { userStatus }