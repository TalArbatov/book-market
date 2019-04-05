import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import setAuthorizationToken from './utils/setAuthorizationToken'
const configStore = () => createStore(
  combineReducers({
    userReducer
  }), compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)


export default configStore;