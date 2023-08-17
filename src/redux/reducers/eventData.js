const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  eventData: null,
};

const eventData = createSlice({
  name: 'eventData',
  initialState,
  reducers: {
    setEventData: (state, action) => {
      state.eventData = action.payload;
    },
  },
});

export const {setEventData} = eventData.actions;
export default eventData.reducer;
