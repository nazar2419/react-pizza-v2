import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async(params)=> {
  const {sortBy,order, category,search, currentPage } = params;
  const { data } = await axios.get(`https://629f57d88b939d3dc2959983.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
  return data;
});


const initialState = {
  items: [],
  status: 'loading',
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: { // for asynchronous action
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    }
  }
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;