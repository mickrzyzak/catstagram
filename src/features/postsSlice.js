import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../features/usersSlice";
import { getPhotos } from "../features/photosSlice";

const url = "https://dummyjson.com/posts";

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (limit = 3, thunkAPI) => {
    const state = thunkAPI.getState();

    // Fetch posts
    const skip = state.posts.count;
    const response = await fetch(`${url}?skip=${skip}&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => data);
    response.posts = response.posts.filter(
      (post) =>
        state.posts.data.findIndex((post1) => post.id === post1.id) === -1
    );

    // Fetch comments
    response.posts.forEach((post) => thunkAPI.dispatch(getComments(post.id)));

    // Fetch users
    response.posts.forEach((post) => thunkAPI.dispatch(getUser(post.userId)));

    // Fetch photos
    thunkAPI.dispatch(getPhotos(response.posts.map((post) => post.id)));

    return { posts: response.posts, count: limit };
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId, thunkAPI) => {
    const state = thunkAPI.getState();

    // Fetch posts
    const response = await fetch(`${url}/user/${userId}`)
      .then((response) => response.json())
      .then((data) => data);
    response.posts = response.posts.filter(
      (post) =>
        state.posts.data.findIndex((post1) => post.id === post1.id) === -1
    );

    // Fetch comments
    response.posts.forEach((post) => thunkAPI.dispatch(getComments(post.id)));

    // Fetch photos
    thunkAPI.dispatch(getPhotos(response.posts.map((post) => post.id)));

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
  count: 0,
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
        user: {
          id: action.payload.userId,
          username: action.payload.username,
        },
      });
    },
    removeComment(state, action) {
      let post = state.data.find((post) => post.id === action.payload.postId);
      post.comments = post.comments.filter(
        (comment, index) => index !== action.payload.commentId
      );
    },
    resetReactions(state, action) {
      state.data.forEach((post) => (post.reacted = false));
    },
  },
  extraReducers: (builder) => {
    // Get posts
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.count += action.payload.count;
      state.data = state.data.concat(action.payload.posts);
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.error = {
        title: "Cannot load data from API",
        description: "Please try again later",
      };
    });
    // Get user posts
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.data = state.data.concat(action.payload);
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
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

export const {
  addReaction,
  removeReaction,
  addComment,
  removeComment,
  resetReactions,
} = postsSlice.actions;

export default postsSlice.reducer;
