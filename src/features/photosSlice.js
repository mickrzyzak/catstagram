import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://api.thecatapi.com/v1/images/search";
const apiKey =
  "live_XAE2YtjDNDCOCl1YvtgoOzpqygpFEdLbluCcsXYMuwRD9Wso2KuHiDNCuxG9CA7R";

export const getPhotos = createAsyncThunk(
  "photos/getPhotos",
  async (postIds, thunkAPI) => {
    const state = thunkAPI.getState();

    postIds = postIds.filter(
      (postId) =>
        state.photos.data.findIndex((photo) => photo.postId === postId) === -1
    );

    if (postIds.length === 0) return null;

    const response = await fetch(
      `${url}?limit=${postIds.length}&mime_types=jpg,png&size=full&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => data);

    return response.map((photo, index) => ({
      ...photo,
      postId: postIds[index],
    }));
  }
);

const initialState = {
  data: [],
};

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    addPhoto(state, action) {
      state.data.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      if (action.payload === null) return;
      state.data = state.data.concat(action.payload);
    });
    builder.addCase(getPhotos.rejected, (state, action) => {
      state.error = {
        title: "Cannot load data from API",
        description: "Please try again later",
      };
    });
  },
});

export const { addPhoto } = photosSlice.actions;

export default photosSlice.reducer;
