import {createStore, combineReducers} from 'redux';
import frm from './modules/frm';

const reducers = combineReducers({
	frm
});

const configureStore = () => {
	const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
	return store;
};

export default configureStore;