import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGY3MjNhZTJmNDA3MGI3ZmJlNWRhZWQ1NDVlOGY5NCIsInN1YiI6IjY2NjAyZDQxZDA1OTlhMTJlNDdkOGJjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QETDvBgk4dmvd4gdv1APW9h4fS3E1crpFEkyPwLyq_Y'
    }
};

export const fetchTrendingMovies = createAsyncThunk("homePage/fetchTrendingMovies", async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, options).then(response => response.json())
    return response.results;
})

export const fetchNewReleaseMovies = createAsyncThunk("homePage/fetchNewReleaseMovies", async (search) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`, options).then(response => response.json())
    return response.results;
})

export const fetchTopRatedMovies = createAsyncThunk("homePage/fetchTopRatedMovies", async (search) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, options).then(response => response.json())
    return response.results;
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