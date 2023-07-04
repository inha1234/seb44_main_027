import { combineReducers } from '@reduxjs/toolkit';
import dummySlice from './reducers/dummySlice';

const rootReducer = combineReducers({
    dummy: dummySlice.reducer,
});

export default rootReducer;