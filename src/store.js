import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/usersSlice";
import postsReducer from "./features/postsSlice";
import photosReducer from "./features/photosSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    photos: photosReducer,
  },
});
