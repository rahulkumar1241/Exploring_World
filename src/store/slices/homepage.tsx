import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { useApiService } from '../api/api';
import useLocalStorage from '../../utils/localStorage';

type InitialState =
    {
        loadingHomepageData: boolean,
        homepageData: any,
        loadingGetCountryBySearch:boolean,
        loadingGetCountriesByRegion:boolean
    }
const initialState: InitialState = {
    loadingHomepageData: false,
    homepageData: [],
    loadingGetCountryBySearch:false,
    loadingGetCountriesByRegion:false
}

const namespace = "homepage"
// Generates pending, fulfilled and rejected action types

const HOMEPAGE = "/all";
const SEARCH_COUNTRY="/name";
const SEARCH_COUNTRY_BY_REGION="/region"


export const getAllHomepageData = createAsyncThunk(`${namespace}/getAllHomepageData`, async (payload: any, { rejectWithValue }) => {
    let apiPayload = { method: "GET", url: HOMEPAGE }
    let response: any = await useApiService(apiPayload);
    //////////////If API CRASHES//////////
    if (response.isCrash) {
        return rejectWithValue(response.error);
    }
    return response;
})


export const getCountryData = createAsyncThunk(`${namespace}/getCountryData`, async (payload: any, { rejectWithValue }) => {
    let apiPayload = { method: "GET", url: SEARCH_COUNTRY+"/"+payload.search}
    let response: any = await useApiService(apiPayload);
    //////////////If API CRASHES//////////
    if (response.isCrash) {
        return rejectWithValue(response.error);
    }
    return response;
})

export const getCountriesByRegion = createAsyncThunk(`${namespace}/getCountriesByRegion`, async (payload: any, { rejectWithValue }) => {
    let apiPayload = { method: "GET", url: SEARCH_COUNTRY_BY_REGION+"/"+payload.region}
    let response: any = await useApiService(apiPayload);
    //////////////If API CRASHES//////////
    if (response.isCrash) {
        return rejectWithValue(response.error);
    }
    return response;
})


const authSlice = createSlice({
    name: 'homepage',
    initialState,
    reducers: {},
    extraReducers: builder => {
        //////////////////////////////////////////////////////
        builder.addCase(getAllHomepageData.pending, state => {
            debugger
            state.loadingHomepageData = true
        })
        builder.addCase(
            getAllHomepageData.fulfilled,
            (state, action: PayloadAction<any>) => {
                debugger
                state.loadingHomepageData = false;
                state.homepageData = action.payload.data;
            }
        )
        builder.addCase(getAllHomepageData.rejected, (state, action) => {
            state.loadingHomepageData = false
        })
        /////////////////////////////////////////////////

        builder.addCase(getCountryData.pending, state => {
            state.loadingGetCountryBySearch = true
        })
        builder.addCase(
            getCountryData.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loadingGetCountryBySearch = false;
                state.homepageData = action.payload.data;
            }
        )
        builder.addCase(getCountryData.rejected, (state, action) => {
            state.loadingGetCountryBySearch = false;
            state.homepageData = []
        })
        ////////////////////////////
        builder.addCase(getCountriesByRegion.pending, state => {
            state.loadingGetCountriesByRegion = true
        })
        builder.addCase(
            getCountriesByRegion.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.loadingGetCountriesByRegion = false;
                state.homepageData = action.payload.data;
            }
        )
        builder.addCase(getCountriesByRegion.rejected, (state, action) => {
            state.loadingGetCountriesByRegion = false
        })
    }
})

export default authSlice.reducer;