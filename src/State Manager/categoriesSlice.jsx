import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGY3MjNhZTJmNDA3MGI3ZmJlNWRhZWQ1NDVlOGY5NCIsInN1YiI6IjY2NjAyZDQxZDA1OTlhMTJlNDdkOGJjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QETDvBgk4dmvd4gdv1APW9h4fS3E1crpFEkyPwLyq_Y'
    }
};

export const fetchCategoriesMovies = createAsyncThunk(
    "categories/fetchCategoriesMovies", async (category) => {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${category}`, options).then(response => response.json())
        console.log(response)
        return response.results;
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