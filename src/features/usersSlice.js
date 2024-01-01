import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://dummyjson.com/users";

export const getUser = createAsyncThunk(
  "users/getUser",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();

    if (state.users.data.findIndex((user) => id === user.id) !== -1)
      return null;

    const response = await fetch(`${url}/${id}`)
      .then((response) => response.json())
      .then((data) => data);

    return response;
  }
);

const initialState = {
  data: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload === null) return;
      state.data.push(action.payload);
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = {
        title: "Cannot load data from API",
        description: "Please try again later",
      };
    });
  },
});

//export const {} = usersSlice.actions;

export default usersSlice.reducer;
