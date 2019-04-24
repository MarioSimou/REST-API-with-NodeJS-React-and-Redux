import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { messageReducer } from './messagesReducer'
import { userStatus } from './authReducer'

export default combineReducers({ messageReducer  ,  userStatus , form : formReducer })