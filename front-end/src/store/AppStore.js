import {createStore} from 'redux';
import app_reducer from '../reducers/app';


let store = createStore(app_reducer);
export default store;
