import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({ start : ()=> 1  , form : formReducer })