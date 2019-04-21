import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { messageReducer } from './messagesReducer'

export default combineReducers({ messageReducer  , form : formReducer })