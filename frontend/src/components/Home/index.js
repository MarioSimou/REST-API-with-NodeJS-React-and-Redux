import React from 'react'
import u from '../../util'
import { connect } from 'react-redux'
import { updateMessage } from '../../actions'

const Home = props => {
    const { message } = props
    const msgJSX = u.renderMessage( message )
    
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
    return { message : state.messageReducer }
}

export default connect( mapStateToProps  , { updateMessage } )( Home )