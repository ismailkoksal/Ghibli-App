import {combineReducers, createStore} from 'redux';
import {filmReducer} from './film/reducers';
import {noteReducer} from './note/reducers';

const rootReducer = combineReducers({
  film: filmReducer,
  note: noteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer);
