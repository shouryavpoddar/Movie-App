import Sidebar from "./Components/Sidebar";
import SearchBar from "./Components/SearchBar";
import genre from "./genre.json";
import { useSelector } from "react-redux";
import React, { lazy, } from "react";

import withSuspense from "./hoc/withSuspence";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {fetchBestTopRatedMovies, fetchNewMovies, fetchTopTrendingMovies} from "./ApiServicer/Api";

export default function Home() {
    const navigate = useNavigate();
    const watchlist = useSelector(state => state.watchlist.movies);

    const MostTrendingMovie = lazy(() => import('./Components/MostTrendingMovie'));
    const Poster = lazy(() => import('./Components/Poster'));

    const PosterWithSuspense = withSuspense(Poster, <div className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>);
    const MostTrendingMovieWithSuspense = withSuspense(MostTrendingMovie, <div className="animate-pulse rounded-3xl w-full h-[600px] bg-slate-200 flex items-center justify-center"> Loading...</div>)

    const queryClient = useQueryClient();

    const {data: tendingMovies, isLoading: tendingMoviesIsLoading, isError} = useQuery({
        queryKey: 'tendingMovies',
        queryFn: () => fetchTopTrendingMovies(),
    })

    const {data: topRatedMovies, isLoading: topRatedMoviesIsLoading, isError: topRatedMoviesIsError} = useQuery({
        queryKey: 'topRatedMovies',
        queryFn: () => fetchBestTopRatedMovies(),
    })

    const {data: newReleaseMovies, isLoading: newReleaseMoviesIsLoading, isError: newReleaseMoviesIsError} = useQuery({
        queryKey: 'newReleaseMovies',
        queryFn: () => fetchNewMovies(),
    })

    const changeScreen = (screenIndex) => {
        if (genre.genres.some(genre => genre.id === screenIndex)) {
            queryClient.invalidateQueries('categories');
            queryClient.setQueryData('screenIndex', screenIndex);
            navigate(`/genre?${screenIndex}`);
        }
    };



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
                    {tendingMoviesIsLoading ? <div
                            className="animate-pulse rounded-3xl w-full h-[600px] bg-slate-200 flex items-center justify-center"> Loading...</div>:
                        <MostTrendingMovieWithSuspense movie={tendingMovies[0]}/>}
                    <div className={'flex flex-col space-y-10'}>
                        <div className={'mt-10 items-center justify-start'}>
                            <h1 className={'font-medium text-2xl mb-5'}>Most Trending</h1>
                                <div className={'grid grid-cols-5 gap-4'}>
                                    {tendingMovies?.map((movie, index) => {
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
                                {newReleaseMovies?.map((movie, index) => {
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
                                {topRatedMovies?.map((movie, index) => {
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
            </Sidebar.Body>
        </Sidebar>
    );
}
