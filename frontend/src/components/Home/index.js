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

    switch( Object.values( products).length > 0 ? true : false ){
        case true:
        return (
            <React.Fragment>
                { msgJSX }
                <div className="home container-fluid p-0 m-0">
                    <div className="container-fluid m-2">
                        <div className="row">
                            { Object.values( products ).map( p => {
                                console.log( p )
                                return (
                                    <div className="col-12 col-md-6 col-lg-4" key={ p.product_id } >
                                        <div className="card">
                                            <img src={ p.product_image } className="card-img-top" alt={ p.product_name } />
                                            <div className="card-body">
                                                <h5 className="card-title">{ p.product_name }</h5>
                                                <h6 className="card-subtitle mb-2 text-muted">{ p.email }</h6>
                                                <p className="card-text">{ p.description }</p>
                                                <div>
                                                    <a href={ `/products/${ p.product_id }` } className="mr-2 btn btn-outline-success" >
                                                        View
                                                    </a>
                                                    <a href={ `/products/${ p.product_id }/edit` } className="mr-2 btn btn-outline-warning" >
                                                        Edit
                                                    </a>
                                                    <a href="#" className="btn btn-outline-danger" >
                                                        Delete
                                                    </a>
                                                </div>
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
                <div className="text-center">
                    <div className="spinner-border m-5" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )    
    } 
}

const mapStateToProps = state => {
    return { message : state.messageReducer , products : state.requestsReducer }
}

export default connect( mapStateToProps  , { updateMessage , fetchProducts } )( Home )