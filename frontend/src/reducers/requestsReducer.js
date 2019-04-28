import * as t from '../actions/types'

const requestsReducer = (state = {}, action) => {
    let product;
    switch (action.type) {
        case t.FETCH_PRODUCTS:
            return { ...state, ...action.payload.products }
        case t.DELETE_PRODUCT:
            return { ...action.payload.products }
        case t.FETCH_PRODUCT:
            product = action.payload.product
            return { ...state , [product.product_id]:product }
        case t.ADD_PRODUCT:
            product = action.payload.product
            return { ...state , [product.product_id]:product }
        case t.EDIT_PRODUCT:
            product = action.payload.product
            return { ...state , [product.product_id]:product }
        default:
            return state
    }
}

export { requestsReducer }