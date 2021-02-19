import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFonts } from '../../../api/fonts';
import { requestUtil } from "../../../utils/requestUtil"

export const fetchFontsRequest = createAsyncThunk(
    'fonts/fetchFonts',
    async () => {
        return await requestUtil(fetchFonts);
    }
);

const initialState = {
    loading: false,
    error: null,
    data: []
};

const fontsSlice = createSlice({
    name: 'fonts',
    initialState,
    reducers: {},
    extraReducers: {
        [`${fetchFontsRequest.fulfilled}`]: (state: any, action) => {
            state.data = action.payload;
        }
    }
});

export const fontsReducer = fontsSlice.reducer;