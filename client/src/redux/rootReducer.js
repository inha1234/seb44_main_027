import { combineReducers } from '@reduxjs/toolkit';
import dummySlice from './reducers/dummySlice';
import postDataSlice from './reducers/postDataSlice';

const rootReducer = combineReducers({
  dummy: dummySlice.reducer,
  postData: postDataSlice.reducer,
});

export default rootReducer;
