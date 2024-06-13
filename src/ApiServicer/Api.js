const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGY3MjNhZTJmNDA3MGI3ZmJlNWRhZWQ1NDVlOGY5NCIsInN1YiI6IjY2NjAyZDQxZDA1OTlhMTJlNDdkOGJjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QETDvBgk4dmvd4gdv1APW9h4fS3E1crpFEkyPwLyq_Y'
    }
};

export const fetchTopTrendingMovies = async () =>{
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, options)
    if(!response.ok){
        throw new Error('Failed to fetch Top Trending Movies');
    }

    const data = await response.json();
    return data.results;
}

export const fetchBestTopRatedMovies = async () =>{
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, options)
    if(!response.ok){
        throw new Error('Failed to fetch Best Top Rated Movies');
    }
    const data = await response.json();
    return data.results
}

export const fetchNewMovies = async () =>{
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US`, options)
    if(!response.ok){
        throw new Error('Failed to fetch New Movies');
    }
    const data = await response.json();
    return data.results
}

export const fetchMovieCredit = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, options)
    if(!response.ok){
        throw new Error('Failed to fetch Movie Credits');
    }
    const data = await response.json();
    const topCast= data.cast.slice(0, 4)
    const directors = data.crew.filter(member => member.known_for_department === "Directing")
    const writers = data.crew.filter(member => member.known_for_department === "Writing")
    return {topCast, directors, writers};
}

export const fetchVideos = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
    if(!response.ok){
        throw new Error('Failed to fetch Videos');
    }
    const data = await response.json();
    const trailer = data.results.find(video => video.type === "Trailer")
    return trailer.key;
}

export const fetchMovieDetails = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options);
    if(!response.ok){
        throw new Error('Failed to fetch Movie Details');
    }
    const data = await response.json();
    return data;
}

export const fetchSimilarMovies = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US`, options)
    if(!response.ok){
        throw new Error('Failed to fetch Similar Movies');
    }
    const data= await response.json();
    const top4 = data.results.sort((a, b) => b.popularity - a.popularity).slice(0, 4)
    return top4;
}

export const fetchMoviesByGenre = async (genreId) => {
    console.log(genreId)
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`, options)
    if(!response.ok){
        throw new Error('Failed to fetch Movies By Genre');
    }
    const data = await response.json();
    return data.results;
}

export const fetchMovieBySearchName = async (searchName) => {
    console.log(searchName)
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchName}&include_adult=false&language=en-US&page=1`, options)
    if(!response.ok){
        throw new Error('Failed to fetch Movie By Search Name');
    }

    const data = await response.json()
    return  data.results;
}