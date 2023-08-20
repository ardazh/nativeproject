const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  eventId: null,
};

const eventId = createSlice({
  name: 'eventId',
  initialState,
  reducers: {
    setEventId: (state, action) => {
      state.eventId = action.payload;
    },
    clearEventId: state => {
      state.eventId = null;
    },
  },
});

export const {setEventId, clearEventId} = eventId.actions;
export default eventId.reducer;
