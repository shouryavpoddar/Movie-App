import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchBestTopRatedMovies, fetchNewMovies, fetchTopTrendingMovies} from "../ApiServicer/Api";

export const fetchTrendingMovies = createAsyncThunk("homePage/fetchTrendingMovies", async () => {
    const response = await fetchTopTrendingMovies()
    return response;
})

export const fetchNewReleaseMovies = createAsyncThunk("homePage/fetchNewReleaseMovies", async (search) => {
    const response = await fetchNewMovies()
    return response;
})

export const fetchTopRatedMovies = createAsyncThunk("homePage/fetchTopRatedMovies", async (search) => {
    const response = await fetchBestTopRatedMovies()
    return response;
})

const searchMovieSlice = createSlice({
    name: "homePage",
    initialState: {
        tendingMovies: [],
        newReleaseMovies: [],
        topRatedMovies: [],
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTrendingMovies.pending, (state, action) => {
            console.log("fetching search trending movies")
        })
        builder.addCase(fetchTrendingMovies.rejected, (state, action) => {
            console.log("failed to fetch search trending movies")
        })
        builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
            state.tendingMovies = action.payload
        })
        builder.addCase(fetchNewReleaseMovies.pending, (state, action) => {
            console.log("fetching search new release movies")
        })
        builder.addCase(fetchNewReleaseMovies.rejected, (state, action) => {
            console.log("failed to fetch search new release movies")
        })
        builder.addCase(fetchNewReleaseMovies.fulfilled, (state, action) => {
            state.newReleaseMovies = action.payload
        })
        builder.addCase(fetchTopRatedMovies.pending, (state, action) => {
            console.log("fetching search top rated movies")
        })
        builder.addCase(fetchTopRatedMovies.rejected, (state, action) => {
            console.log("failed to fetch search top rated movies")
        })
        builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
            state.topRatedMovies = action.payload
        })
    }
});

export default searchMovieSlice.reducer