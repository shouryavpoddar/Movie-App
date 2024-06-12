import Sidebar from "./Components/Sidebar";
import SearchBar from "./Components/SearchBar";
import genre from "./genre.json";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesMovies } from "./State Manager/categoriesSlice";
import { fetchNewReleaseMovies, fetchTopRatedMovies, fetchTrendingMovies } from "./State Manager/homePageSlice";
import React, { lazy, useEffect } from "react";

import withSuspense from "./hoc/withSuspence";

export default function Home() {
    const watchlist = useSelector(state => state.watchlist.movies);
    const dispatch = useDispatch();
    const categorieMovies = useSelector(state => state.categories.movies);
    const { tendingMovies, newReleaseMovies, topRatedMovies } = useSelector(state => state.homePage);

    const MostTrendingMovie = lazy(() => import('./Components/MostTrendingMovie'));
    const Poster = lazy(() => import('./Components/Poster'));

    const PosterWithSuspense = withSuspense(Poster, <div className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>);
    const MostTrendingMovieWithSuspense = withSuspense(MostTrendingMovie, <div className="animate-pulse rounded-3xl w-full h-[600px] bg-slate-200 flex items-center justify-center"> Loading...</div>)

    const changeScreen = (screenIndex) => {
        if (genre.genres.some(genre => genre.id === screenIndex)) {
            console.log(screenIndex);
            dispatch(fetchCategoriesMovies(screenIndex));
        }
    };

    useEffect(() => {
        dispatch(fetchTopRatedMovies());
        dispatch(fetchNewReleaseMovies());
        dispatch(fetchTrendingMovies());
    }, []);

    return (
        <Sidebar defaultScreen={'Home'} onChange={changeScreen}>
            <Sidebar.Bar>
                <Sidebar.ItemList>
                    <Sidebar.Item screenIndex={'Home'}>Home</Sidebar.Item>
                    <Sidebar.Item screenIndex={'Watchlist'}>Watchlist</Sidebar.Item>
                    <Sidebar.CollapsibleSection title={'Categories'}>
                        {genre.genres.map((genre) => (
                            <Sidebar.Item key={genre.id} screenIndex={genre.id}>{genre.name}</Sidebar.Item>
                        ))}
                    </Sidebar.CollapsibleSection>
                </Sidebar.ItemList>
            </Sidebar.Bar>
            <Sidebar.Body>
                <Sidebar.Screen screenIndex={'Home'}>
                    <SearchBar />
                    <MostTrendingMovieWithSuspense  movie={tendingMovies[0]}/>
                    <div className={'flex flex-col space-y-10'}>
                        <div className={'mt-10 items-center justify-start'}>
                            <h1 className={'font-medium text-2xl mb-5'}>Most Trending</h1>
                                <div className={'grid grid-cols-5 gap-4'}>
                                    {tendingMovies.map((movie, index) => {
                                        if (index > 0 && index < 6){
                                            return <PosterWithSuspense key={movie.id} movie={movie} />
                                        };
                                        return null;
                                    })}
                                </div>
                        </div>
                        <div className={'mt-10 items-center justify-start'}>
                            <h1 className={'font-medium text-2xl mb-5'}>New Releases</h1>
                            <div className={'grid grid-cols-5 gap-4'}>
                                {newReleaseMovies.map((movie, index) => {
                                    if (index < 5){
                                        return <PosterWithSuspense key={movie.id} movie={movie} />
                                    };
                                    return null;
                                })}
                            </div>
                        </div>
                        <div className={'mt-10 items-center justify-start'}>
                            <h1 className={'font-medium text-2xl mb-5'}>Top Rated Movies</h1>
                            <div className={'grid grid-cols-5 gap-4'}>
                                {topRatedMovies.map((movie, index) => {
                                    if (index < 5) {
                                        return <PosterWithSuspense key={movie.id} movie={movie} />
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>
                </Sidebar.Screen>
                <Sidebar.Screen screenIndex={'Watchlist'}>
                    <h1 className={'font-medium text-2xl mb-5'}>Watchlist</h1>
                        <div className={'grid grid-cols-5 gap-4'}>
                            {watchlist.map((movie) => (
                                <PosterWithSuspense key={movie.id} movie={movie} />
                            ))}
                        </div>
                </Sidebar.Screen>
                {genre.genres.map((genre) => (
                    <Sidebar.Screen key={genre.id} screenIndex={genre.id}>
                        <h1 className={'font-medium text-2xl mb-5'}>{genre.name}</h1>
                            <div className={'grid grid-cols-5 gap-4'}>
                                {categorieMovies?.map((movie) => (
                                    <PosterWithSuspense key={movie.id} movie={movie} />
                                ))}
                            </div>
                    </Sidebar.Screen>
                ))}
            </Sidebar.Body>
        </Sidebar>
    );
}
