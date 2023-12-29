import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://api.thecatapi.com/v1/images/search";
const apiKey =
  "live_XAE2YtjDNDCOCl1YvtgoOzpqygpFEdLbluCcsXYMuwRD9Wso2KuHiDNCuxG9CA7R";

export const getPhotos = createAsyncThunk(
  "photos/getPhotos",
  async ({ limit, postIds }) => {
    const response = await fetch(
      `${url}?limit=${limit}&mime_types=jpg,png&size=full&api_key=${apiKey}`
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.data = state.data.concat(action.payload);
    });
    builder.addCase(getPhotos.rejected, (state, action) => {
      state.error = {
        title: "Cannot load data from API.",
        description: "Please try again later.",
      };
    });
  },
});

//export const {} = photosSlice.actions;

export default photosSlice.reducer;
