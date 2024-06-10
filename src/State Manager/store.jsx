import {configureStore} from "@reduxjs/toolkit";
import watchlistRecuder from "./watchlistSlice";
import focusMovieReducer from "./focusMovieSlice";
import categoriesReducer from "./categoriesSlice";
import searchMovieReducer from "./searchMovieSlice";
import homePageReducer from "./homePageSlice";

export const store = configureStore({
    reducer:{
        watchlist: watchlistRecuder,
        focusMovie: focusMovieReducer,
        categories: categoriesReducer,
        searchMovies: searchMovieReducer,
        homePage: homePageReducer,
    }
    }
)