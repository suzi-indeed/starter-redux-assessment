import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion =
  createAsyncThunk(/* Task 15: Complete the `createAsyncThunk()` function to load a suggestion from this URL: http://localhost:3004/api/suggestion */
    'photos/suggestion',
    async () => {
      //console.log("got into the fetchSuggestion function");
      const response = await fetch('http://localhost:3004/api/suggestion');
      const data = await response.json();
      //console.log("this is the data: ", data);
      return data.data;
    }
    // async (arg, thunkAPI) => {
    //   const response = await fetch('http://localhost:3004/api/suggestion');
    //   const { data } = await response.json();
    //   return data;
    //}
  );


const initialState = {
  suggestion: '',
  loading: false,
  error: true,
};

const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: {
    /* Task 16: Inside `extraReducers`, add reducers to handle all three promise lifecycle states - pending, fulfilled, and rejected - for the `fetchSuggestion()` call */
    [fetchSuggestion.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [fetchSuggestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.suggestion = action.payload
  },
  [fetchSuggestion.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    }
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

// Task 17: Create a selector, called `selectSuggestion`, for the `suggestion` state variable and export it from the file
export const selectSuggestion = (state) => state.suggestion.suggestion;

export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
