import {createStore} from 'redux';
import {filmReducer} from './film/reducers';

export default createStore(filmReducer);
