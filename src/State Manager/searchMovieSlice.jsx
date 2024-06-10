import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGY3MjNhZTJmNDA3MGI3ZmJlNWRhZWQ1NDVlOGY5NCIsInN1YiI6IjY2NjAyZDQxZDA1OTlhMTJlNDdkOGJjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QETDvBgk4dmvd4gdv1APW9h4fS3E1crpFEkyPwLyq_Y'
    }
};

export const fetchSearchMovies = createAsyncThunk("", async (search) => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options).then(response => response.json())
    console.log(response.results)
    return response.results;
})

const searchMovieSlice = createSlice({
    name: "searchMovies",
    initialState: {
        movies: [],
    },
    reducers: {
        setSearch: (state, action) => {
            state.movies = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchMovies.pending, (state, action) => {
            console.log("fetching search movies")
        })
        builder.addCase(fetchSearchMovies.rejected, (state, action) => {
            console.log("failed to fetch search movies")
        })
        builder.addCase(fetchSearchMovies.fulfilled, (state, action) => {
            state.movies = action.payload
        })
    }
});

export const {setSearch} = searchMovieSlice.actions
export default searchMovieSlice.reducer