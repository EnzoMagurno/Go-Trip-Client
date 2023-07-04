import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const TOKEN_FETCH = process.env.NEXT_PUBLIC_TOKEN_FETCH;



export interface Gallery {
    id: number
    urlIMGame: string,
}

export interface InitialStateGallery {
    galleryData: Gallery[]
    copyGalleryData: Gallery[]
    urlIMG: string
    error: string | null
}




export const deleteImage = createAsyncThunk("deleteImage", async (id) => {

  return axios.delete(`/gallery/${id}`, {

    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${TOKEN_FETCH}`
    }
  })
    .then(response => response.data)
})


const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    galleryData: [],
    copyGalleryData: [],
    gallery: {}
  },
  reducers: {
    getGalleryCoincidence: (state, action) => {

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.gallery = action.payload

      })
  }
})



export default gallerySlice;