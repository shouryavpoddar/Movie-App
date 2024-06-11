import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchMoviesByGenre} from "../ApiServicer/Api";

export const fetchCategoriesMovies = createAsyncThunk(
    "categories/fetchCategoriesMovies", async (category) => {
        const response = await fetchMoviesByGenre(category)
        return response;
})


const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        category: '',
        movies: [],
    },
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        }
    }, extraReducers: (builder) => {
        builder.addCase(fetchCategoriesMovies.pending, (state, action) => {
            console.log("fetching categories movies")
        })
        builder.addCase(fetchCategoriesMovies.rejected, (state, action) => {
            console.log("failed to fetch categories movies")
        })
        builder.addCase(fetchCategoriesMovies.fulfilled, (state, action) => {
            state.movies = action.payload
        })
    }
});

export const {setCategory} = categoriesSlice.actions
export default categoriesSlice.reducer