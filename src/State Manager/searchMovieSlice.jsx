import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchMovieBySearchName} from "../ApiServicer/Api";

export const fetchSearchMovies = createAsyncThunk("", async (search) => {
    const response = await fetchMovieBySearchName(search)
    return response;
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