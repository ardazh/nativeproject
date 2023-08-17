const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  profileData: null,
};

const profileData = createSlice({
  name: 'profileData',
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const {setProfileData} = profileData.actions;
export default profileData.reducer;
