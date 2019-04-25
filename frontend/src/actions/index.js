import * as t from './types'
import api from '../config/api'

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

const fetchProducts = () => async function( dispatch ){
        const { data : { res } } = await api.get('/products' )

        dispatch({
            type: t.FETCH_PRODUCTS,
            payload: { products : res }
        })
}


export { updateMessage , userLogin , fetchProducts }