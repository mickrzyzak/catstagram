import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://dummyjson.com/users";

export const getUser = createAsyncThunk("users/getUser", async (id) => {
  const response = await fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((data) => data);

  return response;
});

const initialState = {
  data: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.error = {
        title: "Cannot load data from API.",
        description: "Please try again later.",
      };
    });
  },
});

//export const {} = usersSlice.actions;

export default usersSlice.reducer;
