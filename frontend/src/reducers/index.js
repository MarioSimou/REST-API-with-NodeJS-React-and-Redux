import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { messageReducer } from './messagesReducer'
import { authReducer } from './authReducer'

export default combineReducers({ messageReducer  ,  authReducer , form : formReducer })