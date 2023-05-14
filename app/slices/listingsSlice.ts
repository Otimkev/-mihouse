import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const fetchListings = createAsyncThunk('',async (params:any) => {
    const response = await fetch('https://funcapp-southn-test-01.azurewebsites.net/api/v1/renders?code=7CtiinHq_v1KnndUv2Y8eu82SvhpOBj9ZgVTaicWcAJIAzFukaP2yA==');
    const data = await response.json();
    console.log('DATA', data.value)
    return data.value;
})


const initialState = {
    listings: [],
    pending: false,
    error: false,
} as any

const listingsSlice = createSlice({
    name: 'listings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(fetchListings.pending, state => {
        //     state.pending = true;
        // })

        builder.addCase(fetchListings.fulfilled, (state, action) => {
            state.listings.push(...action.payload)
        })

        // .addCase(fetchListings.rejected, state => {
        //     state.pending = false;
        //     state.error = true;
        // })
        
    }
})

export const selectListings = (state: RootState) => state.listings;

export default listingsSlice.reducer;