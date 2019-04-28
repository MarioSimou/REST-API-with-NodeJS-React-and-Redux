import React , { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProduct } from '../../actions'
import CardDetails from '../CardDetails'

const ProductDetails = ({ match , fetchProduct , product }) => {
    const { id } = match.params

    useEffect( () => {
        fetchProduct( id )
    }, [ id ])


    return (
        <div className="product-details container-fluid p-0 m-0 d-flex justify-content-center align-items-stretch">
            <CardDetails product={ product } />
        </div>
    )
}

const mapStateToProps = ( state, prevProps ) => {
    const { id } = prevProps.match.params
    const products  = state.requestsReducer
    return { product : products && Object.values( products ).length > 0 ? products[id] : {} }
}

export default connect( mapStateToProps  , { fetchProduct } )( ProductDetails )