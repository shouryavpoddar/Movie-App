import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const intialState = {
    movie:{

    },
}

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGY3MjNhZTJmNDA3MGI3ZmJlNWRhZWQ1NDVlOGY5NCIsInN1YiI6IjY2NjAyZDQxZDA1OTlhMTJlNDdkOGJjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QETDvBgk4dmvd4gdv1APW9h4fS3E1crpFEkyPwLyq_Y'
    }
};

export const fetchMovie = createAsyncThunk(
    "focusMovies/fetchMovie", async (movie_id) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`, options).then(response => response.json())
        console.log(response)
        return response;
    }
)

export const fetchVideo = createAsyncThunk(
    "focusMovie/fetchVideo", async (movie_id) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, options).then(response => response.json())
        const trailer = response.results.find(video => video.type === "Trailer")
        return trailer.key;
    }
)

export const fetchSimilar = createAsyncThunk(
    "focusMovie/fetchSimilar", async (movie_id) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US`, options).then(response => response.json())
        const top4 = response.results.sort((a, b) => b.popularity - a.popularity).slice(0, 4)
        return top4;
    }
)

export const fetchMovieCredits = createAsyncThunk(
    "focusMovie/fetchMovieCredits", async (movie_id) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`, options).then(response => response.json())
        const topCast= response.cast.slice(0, 4)
        const directors = response.crew.filter(member => member.known_for_department === "Directing")
        const writers = response.crew.filter(member => member.known_for_department === "Writing")
        console.log("hello")
        console.log({topCast, directors, writers})
        return {topCast, directors, writers};
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