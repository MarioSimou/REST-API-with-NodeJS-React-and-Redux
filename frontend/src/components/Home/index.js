import React , { useEffect } from 'react'
import u from '../../util'
import { connect } from 'react-redux'
import { updateMessage , fetchProducts , deleteProduct } from '../../actions'

const Home = ({ message , fetchProducts , deleteProduct , products , userId }) => {
    const msgJSX = u.renderMessage( message )
    
    // effect hook- behaves like componentDidMount method 
    useEffect(  () => {
        fetchProducts()
    }, [])

    const renderAuthButtons = ( s , { product_id , user_id } ) =>{
        switch( s === user_id ? true : false ){
            case true: 
                return (
                   <div>
                        <a href={ `/products/${ product_id }` } className="mr-2 btn btn-outline-success" >
                        View
                        </a>
                        <a href={ `/products/${ product_id }/edit` } className="mr-2 btn btn-outline-warning" >
                            Edit
                        </a>
                        <button  className="btn btn-outline-danger"
                                 data-id={ product_id }
                                 onClick={ e => deleteProduct( e.target.dataset.id ) }
                        >
                            Delete
                        </button>
                   </div>
                )
            default: 
                return (
                    <div>
                        <a href={ `/products/${ product_id }` } className="mr-2 btn btn-outline-success" >
                        View
                        </a>
                    </div>
                )
        }
    }

    switch( Object.values( products).length > 0 ? true : false ){
        case true:
        return (
            <React.Fragment>
                { msgJSX }
                <div className="home container-fluid p-0 m-0">
                    <div className="container-fluid p-2">
                        <div className="row">
                            { Object.values( products ).map( p => {
                                return (
                                    <div className="col-12 col-md-6 col-lg-4" key={ p.product_id } >
                                        <div className="card">
                                            <img src={ p.product_image } className="card-img-top" alt={ p.product_name } />
                                            <div className="card-body">
                                                <h5 className="card-title">{ p.product_name }</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">{ p.email }</h6>
                                                <p className="card-text">{ p.description }</p>
                                                { renderAuthButtons( userId , p ) }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
            )
        default:
            return (
                <div className="text-center loader d-flex justify-content-center align-items-center" style={{ minHeight : '93.5vh' }}>
                    <div className="spinner-grow text-info" role="status" style={{ height : '4em' , width: '4em' }} >
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )    
    } 
}

const mapStateToProps = state => {
    return { message : state.messageReducer , products : state.requestsReducer , userId : state.userStatus }
}

export default connect( mapStateToProps  , { updateMessage , fetchProducts , deleteProduct } )( Home )