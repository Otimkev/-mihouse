import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export const fetchListingById = createAsyncThunk('',async (params:any) => {
    const response = await fetch(`https://funcapp-southn-test-01.azurewebsites.net/api/v1/renders/${params}?code=8-oV8w83oZnpyfwHraiyC8YRsyWV8HXI-SEvInkUsBiYAzFueJX87A==`);
    const data = await response.json()
    return data.value;
})


const initialState = {
    listing: {},
    pending: false,
    error: false,
} as any

const listingByIdSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchListingById.pending, state => {
            state.pending = true;
        })

        builder.addCase(fetchListingById.fulfilled, (state, action) => {
            state.listing = action.payload
            state.pending = false;
        })

        .addCase(fetchListingById.rejected, state => {
            state.pending = false;
            state.error = true;
        })
        
    }
})

export const selectListingById = (state: RootState) => state.listing;

export default listingByIdSlice.reducer;