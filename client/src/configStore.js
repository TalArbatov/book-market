import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import forumReducer from './reducers/forumReducer';

const configStore = () => createStore(
  combineReducers({
    userReducer,
    forumReducer
  }), compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)


export default configStore;