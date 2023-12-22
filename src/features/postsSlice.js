import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../features/usersSlice";

const url = "https://dummyjson.com/posts";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (limit = 5, thunkAPI) => {
    const state = thunkAPI.getState();

    // Fetch new posts
    const skip = state.posts.data.length;
    const response = await fetch(`${url}?skip=${skip}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => data);

    // Fetch connected users
    response.posts.forEach((post) =>
      state.users.data.findIndex((user) => user.id === post.userId) === -1
        ? thunkAPI.dispatch(getUser(post.userId))
        : false
    );

    return response.posts;
  }
);

const initialState = {
  data: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.data = state.data.concat(action.payload);
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.error = {
        title: "Cannot load data from API.",
        description: "Please try again later.",
      };
    });
  },
});

//export const {} = postsSlice.actions;

export default postsSlice.reducer;
