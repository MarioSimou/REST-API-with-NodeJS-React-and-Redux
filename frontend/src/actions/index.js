import * as t from './types'

const updateMessage = ({ content , state }) => ({
    type: t.UPDATE_MESSAGE,
    payload : { content , state }
})

const userLogin =  ({ exp , id }) => {
    console.log('Condition:' , Date.now() / 1000 < exp )
    switch( Date.now() / 1000 < exp ){
        case true:
            console.log( 'inside')
            console.log( id )
            return { type : t.USER_LOGIN , payload : { id } }
        default:
            return { type : t.USER_LOGIN , payload : {} }
    }
}

export { updateMessage , userLogin }