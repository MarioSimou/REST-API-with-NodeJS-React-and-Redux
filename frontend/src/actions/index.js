import * as t from './types'

const updateMessage = ({ content , state }) => ({
    type: t.UPDATE_MESSAGE,
    payload : { content , state }
})

const userLogin =  ({ exp , id }) => {    
    return {
        type : t.USER_LOGIN,
        payload: { id : exp && Date.now() / 1000 < exp ? id : null }
    }
}


export { updateMessage , userLogin  }