import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  recentSearch: [],
  loading: false,
  error: false,
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      localStorage.clear();
    },
    addRecentSearch: (state, action) => {
      const token = action.payload;
      if (
        !state.recentSearch.some(
          (search) => search.tokenname === token.tokenname
        )
      ) {
        state.recentSearch.push(token);
        console.log(token);
      }
    },
    updateUser: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  addRecentSearch,
  updateUser,
} = counterSlice.actions;

export default counterSlice.reducer;
