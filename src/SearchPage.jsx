import SearchBar from "./Components/SearchBar";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import withSuspense from "./hoc/withSuspence";
import React, {lazy} from "react";

export default function SearchPage() {
    const Poster = lazy(() => import('./Components/Poster'));
    const PosterWithSuspense = withSuspense(Poster, <div className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>);

    const navigate = useNavigate();
    const movies = useSelector(state => state.searchMovies.movies);

    return (
        <div className={"flex flex-col  justify-center"}>
            <div className={"flex flex-row items-center mr-5"}>
                <button onClick={() => {
                    navigate('/')
                }} className={"bg-gray-800 ml-2.5 p-2 h-10 rounded-2xl text-white items-center"}>Home
                </button>
                <SearchBar/>
            </div>
            <div className={'grid grid-cols-5 gap-5'}>
                {movies?.map((movie) => {
                    if(movie.poster_path) return <PosterWithSuspense key={movie.id} movie={movie}/>
                })}
            </div>
        </div>)
}