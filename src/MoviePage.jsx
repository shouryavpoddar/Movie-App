import SearchBar from "./Components/SearchBar";
import {useDispatch, useSelector} from "react-redux";
import React, {lazy, startTransition, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {addMovieToWatchlist, removeMovieFromWatchlist} from "./State Manager/watchlistSlice";
import withSuspense from "./hoc/withSuspence";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchMovieCredit, fetchMovieDetails, fetchSimilarMovies, fetchVideos} from "./ApiServicer/Api";
import VideoComponent from "./Components/VideoComponent";

export default function MoviePage() {
    const watchlist = useSelector(state => state.watchlist.movies);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const movieId = queryClient.getQueryData('movieId')

    const {data: movie, isLoading: isMovieLoading, isError} = useQuery({
        queryKey: ['movie', movieId],
        queryFn: () => fetchMovieDetails(movieId),
        enabled: !!movieId
    })

    const {data: similarMovies, isLoading: isSimilarMoviesLoading, isError: isSimilarMoviesError} = useQuery({
        queryKey: ['similarMovies', movieId],
        queryFn: () => fetchSimilarMovies(movieId),
        enabled: !!movieId
    })

    const {data: video, isLoading: isVideoLoading, isError: isVideoError} = useQuery({
        queryKey: ['video', movieId],
        queryFn: () => fetchVideos(movieId),
        enabled: !!movieId
    })

    const {data: movieCredits, isLoading: isMovieCreditsLoading, isError: isMovieCreditsError} = useQuery({
        queryKey: ['movieCredits', movieId],
        queryFn: () => fetchMovieCredit(movieId),
        enabled: !!movieId
    })

    const Poster = lazy(() => import('./Components/Poster'))

    const PosterWithSuspense = withSuspense(Poster, <div className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>)

    const [watchlistStatus, setWatchlistStatus] = useState(false);

    const handleAddToWatchlist = () => {
        startTransition(() => {
            dispatch(addMovieToWatchlist(movie));
            setWatchlistStatus(true);
        });
    };

    const handleDeleteFromWatchlist = () => {
        startTransition(() => {
            dispatch(removeMovieFromWatchlist(movie));
            setWatchlistStatus(false);
        });
    };


    useEffect(() => {
        if(isMovieLoading) return
        setWatchlistStatus(watchlist.find((watchlistMovie) => watchlistMovie.id === movie.id))
    }, [watchlist, movie]);


    return(
        <div className={"flex flex-col  justify-center"}>
            <div className={"flex flex-row items-center mr-5"}>
                <button onClick={()=>{navigate('/')}} className={"bg-gray-800 ml-2.5 p-2 h-10 rounded-2xl text-white items-center"}>Home</button>
                <SearchBar/>
            </div>
            <div className={"flex flex-row justify-center"}>
                {isVideoLoading ? <div
                        className="animate-pulse rounded-3xl w-5/6 h-[600px] bg-slate-200 flex items-center justify-center"> Loading.... </div> :
                    <VideoComponent youtubeID={video}/>}
            </div>
            <div className={"flex flex-row justify-center mt-2.5"}>
                <div className={'grid grid-cols-6 gap-4 w-5/6'}>
                    <div className={'grid grid-cols-subgrid col-span-6 gap-4 items-center'}>
                        <div className={'col-start-1 col-span-4'}>
                            <div
                                className={'flex flex-nowrap bg-gray-800 text-white items-center text-xl rounded-3xl'}>
                                <div className={'p-4 flex-1 text-center'}>{movie?.title}</div>
                                *
                                <div className={'p-4 flex-1 text-center'}>{movie?.release_date}</div>
                                *
                                <div className={'p-4 flex-1 text-center'}>{movie?.runtime}</div>
                                *
                                <div className={"flex p-4"}>
                                    <div className={"flex-1 text-center"}>{movie?.genres.map((genre) => genre.name).join(', ')}</div>
                                </div>
                            </div>
                        </div>
                        <div className={'col-start-5 col-span-2 bg-gray-800 rounded-3xl items-stretch'}>
                            <div
                                className={'flex flex-row justify-center'}>
                                <div className={'text-white text-md p-4'}> TMDb Rating {movie?.vote_average} | 10
                                </div>
                                {
                                    watchlistStatus ? <button onClick={handleDeleteFromWatchlist}
                                                              className={'text-white bg-red-700 hover:bg-red-800 focus:ring-2 focus:ring-red-300 rounded-3xl text-xs px-5 py-2.5 m-2'}>Remove from Watchlist</button> :
                                        <button onClick={handleAddToWatchlist}
                                                className={'text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 mt-2 mb-2'}>Add to Watchlist
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={'col-span-4'}>
                        <div className={'grid grid-cols-subgrid col-span-4 gap-10'}>
                            <div className={'col-span-2 text-sm text-gray-800'}> - {movie?.tagline}</div>
                            <div className={'col-start-1 col-span-4'}>{movie?.overview} </div>
                            <div className={'col-start-1 col-span-4'}>
                                <div className="relative overflow-x-auto">
                                    <table
                                        className="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <tbody>
                                        <tr className="bg-white border-b">
                                            <th scope="row"
                                                className="px-6 py-4 text-xl font-medium text-gray-900 whitespace-nowrap">
                                                Director:
                                            </th>
                                            <td className="px-6 py-4">
                                                <div>{  isMovieCreditsLoading? 'Loading...' :
                                                    movieCredits?.directors?.map((director) => director.name).join(', ')}</div>
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <th scope="row"
                                                className="px-6 py-4 text-xl font-medium text-gray-900 whitespace-nowrap ">
                                                Writers:
                                            </th>
                                            <td className="px-6 py-4">
                                                { isMovieCreditsLoading? 'Loading...' :
                                                    movieCredits?.writers?.map((writer) => writer.name).join(', ')
                                                }
                                            </td>
                                        </tr>
                                        <tr className="bg-white border-b">
                                            <th scope="row"
                                                className="px-6 text-xl py-4 font-medium text-gray-900 whitespace-nowrap">
                                                Stars:
                                            </th>
                                            <td className="px-6 py-4">
                                                { isMovieCreditsLoading? 'Loading...' :
                                                    movieCredits?.topCast?.map((actor) => actor.name).join(', ')}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={'grid grid-cols-subgrid gap-1 col-span-2'}>
                        <div className={'col-span-2 text-xl font-bold text-gray-800'}>Similar Movies:</div>
                        {isSimilarMoviesLoading? <>
                                <div
                                    className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>
                                <div
                                    className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>
                                <div
                                    className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>
                                <div
                                    className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>
                            </> :
                            similarMovies.map((movie) => {
                                return <PosterWithSuspense key={movie.id} movie={movie}/>
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}