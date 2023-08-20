const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  transactionData: null,
};

const transaction = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactionData: (state, action) => {
      state.transactionData = action.payload;
    },
    clearTransactionData: state => {
      state.transactionData = null;
    },
  },
});

export const {setTransactionData, clearTransactionData} = transaction.actions;
export default transaction.reducer;
