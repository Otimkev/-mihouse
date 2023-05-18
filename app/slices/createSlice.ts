import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import axios from "axios";


export const createRender = createAsyncThunk('',async (params:any) => {
    // const response = await axios.post(`https://funcapp-southn-test-01.azurewebsites.net/api/v1/renders?code=esW6_Nk_NZzAIFzn7z6PEIffxdo66EfvF6ES_0LxJApvAzFuqo0HNw==`,params);

    return await uploadToStableDiffusion(params);
})

const uploadToStableDiffusion = async (fileToUpload: any) => {
    try {
      var formData = new FormData();
      formData.append("image", fileToUpload.originalImageSrc);

      const urlEndpoint = `https://funcapp-southn-test-01.azurewebsites.net/api/v1/renders?code=esW6_Nk_NZzAIFzn7z6PEIffxdo66EfvF6ES_0LxJApvAzFuqo0HNw==`;
      //const urlEndpoint = `http://localhost:7145/api/v1/renders`;
      const result = await fetch(
        urlEndpoint + "&" +
          new URLSearchParams({
            prompt: `${fileToUpload.roomStyle.value}`,
            roomStyle: `${fileToUpload.roomStyle.value}`,
            roomType: `${fileToUpload.roomType.value}`,
            public: `true`,
            userId: `dcbbbe93-e4e3-469f-9af5-72e1d9edad9b`
          }),
        {
          method: "POST",
          body: formData,
        }
      );
      return result;
    } catch (error) {
      return error;
    }
  };


const initialState = {
    render: null,
    isFetchingData: false,
    error: false,
} as any

const CreateSlice = createSlice({
    name: 'create',
    initialState,
    reducers: {
      fetchDataStart: (state) => {
        state.isFetchingData = true;
        state.render = null;
        state.error = false;
      },
      fetchDataSuccess: (state, action) => {
        state.isFetchingData = false;
        state.render = action.payload;
        state.error = false;
      },
      fetchDataFailure: (state, action) => {
        state.isFetchingData = false;
        state.error = action.payload;
      },
    }
})

export const selectRenderSlice = (state: RootState) => state.create;
export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = CreateSlice.actions;

export default CreateSlice.reducer;