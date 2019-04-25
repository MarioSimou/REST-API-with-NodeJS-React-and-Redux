import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { messageReducer } from './messagesReducer'
import { requestsReducer } from './requestsReducer'
import { userStatus } from './authReducer'

export default combineReducers({ messageReducer, userStatus , requestsReducer , form : formReducer })