import { createSlice } from '@reduxjs/toolkit';

const postDataSlice = createSlice({
  name: 'postData',
  initialState: { data: {} },
  reducers: {
    update: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default postDataSlice;
