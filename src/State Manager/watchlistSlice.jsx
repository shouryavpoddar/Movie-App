import {createSlice} from "@reduxjs/toolkit";


const intialState ={
    movies: [
    ],
}

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState: intialState,
    reducers:{
        addMovieToWatchlist: (state, action) => {
            console.log(action.payload)
            if(!(state.movies.reduce((acc, movie) => acc || movie.id === action.payload.id, false))){
                state.movies.push(action.payload)
            }
        },
        removeMovieFromWatchlist: (state, action) => {
            state.movies = state.movies.filter(movie => movie.id !== action.payload.id)
        }
    }
})

export const {addMovieToWatchlist, removeMovieFromWatchlist} = watchlistSlice.actions
export default watchlistSlice.reducer