import React , { useEffect } from 'react'
import u from '../../util'
import { connect } from 'react-redux'
import { updateMessage , fetchProducts } from '../../actions'
const Home = ({ message , fetchProducts , products }) => {
    const msgJSX = u.renderMessage( message )
    
    // effect hook- behaves like componentDidMount method 
    useEffect(  () => {
        fetchProducts()
    }, [])

    return (
        <React.Fragment>
            { msgJSX }
            <div className="home">
                Home page
            </div>
        </React.Fragment>
        )
}

const mapStateToProps = state => {
    return { message : state.messageReducer , products : state.requestsReducer }
}

export default connect( mapStateToProps  , { updateMessage , fetchProducts } )( Home )