import * as t from './types'
import api from '../config/api'
import qs from 'qs'
import history from '../config/history'

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

const addProduct = inProduct => async dispatch => {
        // POST /products , Content-Type: x-www-form-urlencoded
        const { data: { statusCode, res, error } } = await api.post('/products', qs.stringify( inProduct ))
        // GET /products/name/prdouctName 
        const { data : { res:product  }} =  await api.get(`/products/name/${ inProduct.productName}` )
        
        await dispatch({
            type : t.ADD_PRODUCT,
            payload: { product }
        })

        // process the response
        switch ( statusCode) {
            case 200:
                // redirects to home page
                history.push('/')
                // updates message 
                updateMessage( res )
                break;
            default:
                // updates message 
                updateMessage( error )
                break;
        }
}

const editProduct = ( id , inProduct ) => async dispatch => {
    // PUT /products/productId , Content-Type: x-www-form-urlencoded
    const { data: { statusCode, res, error } } = await api.put(`/products/${ id }`, qs.stringify( inProduct ))
    // GET /products/name/prdouctName 
    const { data : { res:product  }} =  await api.get(`/products/name/${ inProduct.productName}` )
    
    await dispatch({
        type : t.EDIT_PRODUCT,
        payload: { product }
    })

    // process the response
    switch ( statusCode) {
        case 200:
            // redirects to home page
            history.push('/')
            // updates message 
            updateMessage( res )
            break;
        default:
            // updates message 
            updateMessage( error )
            break;
    }
}


export { updateMessage , userLogin , fetchProducts , fetchProduct , deleteProduct , addProduct ,editProduct }