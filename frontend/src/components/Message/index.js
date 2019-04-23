import React , { useRef , useEffect } from 'react'
import { connect } from 'react-redux'
import { updateMessage } from '../../actions'

const Message = ({ content , state , updateMessage }) => {
    const msgRef =  useRef( null )
    const c = state === 'positive' ? 'alert-success' : 'alert-danger'

    useEffect(() => {
        // resets the message
        setTimeout(() => updateMessage({}) , 5000 )       
    } , [] )


    return (
        <div className={ `alert ${ c }` } ref={ msgRef }>
            { content }
        </div>
    )
}

const mapStateToProps = state => {
    return { message : state.messageReducer }
}

export default connect( mapStateToProps , { updateMessage })( Message )