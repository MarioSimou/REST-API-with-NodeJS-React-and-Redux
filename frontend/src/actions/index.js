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

const fetchProduct = productId => async dispatch => {
    const { data : { res:product } } = await api.get( `/products/${productId}` )
    dispatch({
        type: t.FETCH_PRODUCT,
        payload : { product }
    })
}

const deleteProduct = productId => async ( dispatch , getState ) => {
    const { requestsReducer:p } = getState()
    const products = Object.values( p ).filter( v => v.product_id !== +productId ).reduce(( a , s ) => ({ ...a , [s.product_id]:s }) , {} )
    // removes product
    await api.delete( `/products/${ productId }`) 
    
    dispatch({
        type : t.DELETE_PRODUCT,
        payload : { products }
    })

}


export { updateMessage , userLogin , fetchProducts , fetchProduct , deleteProduct }