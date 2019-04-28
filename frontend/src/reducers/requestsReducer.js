import * as t from '../actions/types'

const requestsReducer = (state = {}, action) => {
    switch (action.type) {
        case t.FETCH_PRODUCTS:
            return { ...state, ...action.payload.products }
        case t.DELETE_PRODUCT:
            return { ...action.payload.products }
        case t.FETCH_PRODUCT:
            const { product } = action.payload
            return { ...state , [product.product_id]:product }
        default:
            return state
    }
}

export { requestsReducer }