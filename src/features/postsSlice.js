import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../features/usersSlice";
import { getPhotos } from "../features/photosSlice";

const url = "https://dummyjson.com/posts";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (limit = 3, thunkAPI) => {
    const state = thunkAPI.getState();

    // Fetch posts
    const skip = state.posts.data.length;
    const response = await fetch(`${url}?skip=${skip}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => data);

    // Fetch comments
    response.posts.forEach((post) => thunkAPI.dispatch(getComments(post.id)));

    // Fetch users
    response.posts.forEach((post) => thunkAPI.dispatch(getUser(post.userId)));

    // Fetch photos
    thunkAPI.dispatch(
      getPhotos({ limit, postIds: response.posts.map((post) => post.id) })
    );

    return response.posts;
  }
);

export const getComments = createAsyncThunk(
  "posts/getComments",
  async (postId) => {
    const response = await fetch(`${url}/${postId}/comments`)
      .then((response) => response.json())
      .then((data) => data);

    return { postId, comments: response.comments };
  }
);

const initialState = {
  data: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addReaction(state, action) {
      let post = state.data.find((post) => post.id === action.payload);
      post.reactions++;
      post.reacted = true;
    },
    removeReaction(state, action) {
      let post = state.data.find((post) => post.id === action.payload);
      post.reactions--;
      post.reacted = false;
    },
    addComment(state, action) {
      let post = state.data.find((post) => post.id === action.payload.postId);
      post.comments.push({
        id: Date.now(),
        body: action.payload.content,
        postId: action.payload.postId,
        user: { username: "You" },
      });
    },
  },
  extraReducers: (builder) => {
    // Get posts
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.data = state.data.concat(action.payload);
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.error = {
        title: "Cannot load data from API",
        description: "Please try again later",
      };
    });
    // Get comments
    builder.addCase(getComments.fulfilled, (state, action) => {
      let post = state.data.find((post) => post.id === action.payload.postId);
      post.comments = action.payload.comments;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.error = {
        title: "Cannot load data from API",
        description: "Please try again later",
      };
    });
  },
});

export const { addReaction, removeReaction, addComment } = postsSlice.actions;

export default postsSlice.reducer;
