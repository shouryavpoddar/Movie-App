import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchMovieDetails, fetchSimilarMovies, fetchVideos, fetchMovieCredit} from "../ApiServicer/Api.js";

const intialState = {
    movie:{

    },
}

export const fetchMovie = createAsyncThunk(
    "focusMovies/fetchMovie", async (movie_id) => {
        const response = await fetchMovieDetails(movie_id)
        return response;
    }
)

export const fetchVideo = createAsyncThunk(
    "focusMovie/fetchVideo", async (movie_id) => {
        const response = await fetchVideos(movie_id);
        return response;
    }
)

export const fetchSimilar = createAsyncThunk(
    "focusMovie/fetchSimilar", async (movie_id) => {
        const response = await fetchSimilarMovies(movie_id);
        return response;
    }
)

export const fetchMovieCredits = createAsyncThunk(
    "focusMovie/fetchMovieCredits", async (movie_id) => {
        const response = await fetchMovieCredit(movie_id);
        return response;
    }
)

export const focusMovieSlice = createSlice({
    name: "focusMovie",
    initialState: intialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovie.pending, (state, action) => {console.log("fetching movie"); state.movie = {}})
        builder.addCase(fetchMovie.rejected, (state, action) => {console.log("failed to fetch movie")} )
        builder.addCase(fetchMovie.fulfilled, (state, action) => {
            state.movie = action.payload
        })
        builder.addCase(fetchVideo.pending, (state, action) => {console.log("fetching video"); state.movie.video = ''})
        builder.addCase(fetchVideo.rejected, (state, action) => {console.log("failed to fetch video")} )
        builder.addCase(fetchVideo.fulfilled, (state, action) => {
            console.log("fetched video")
            state.movie.video = action.payload
        })
        builder.addCase(fetchSimilar.pending, (state, action) => {console.log("fetching similar"); state.movie.similar = []})
        builder.addCase(fetchSimilar.rejected, (state, action) => {console.log("failed to fetch similar")} )
        builder.addCase(fetchSimilar.fulfilled, (state, action) => {
            console.log("fetched similar")
            state.movie.similar = action.payload
        })
        builder.addCase(fetchMovieCredits.pending, (state, action) => {console.log("fetching credits"); state.movie.topCast = []; state.movie.directors = []; state.movie.writers = []})
        builder.addCase(fetchMovieCredits.rejected, (state, action) => {console.log("failed to fetch credits")} )
        builder.addCase(fetchMovieCredits.fulfilled, (state, action) => {
            console.log("fetched credits")
            state.movie.topCast = action.payload.topCast
            state.movie.directors = action.payload.directors
            state.movie.writers = action.payload.writers
        })
    }
});

export const {focusMovie} = focusMovieSlice.actions

export default focusMovieSlice.reducer