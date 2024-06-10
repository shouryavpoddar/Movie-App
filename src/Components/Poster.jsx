import React from 'react';
import {useDispatch} from "react-redux";
import {fetchMovie, fetchMovieCredits, fetchSimilar, fetchVideo} from "../State Manager/focusMovieSlice";
import {useNavigate} from "react-router-dom";

function Poster({movie}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(fetchMovie(movie.id));
        navigate('/movie');
    }


    return (
            <div onClick={handleClick}
                 className=" me-1 relative bg-contain bg-no-repeat rounded-lg shadow-xl"
            >
                <React.Suspense fallback={<div
                    className="animate-pulse rounded-3xl w-[200px] h-[270px] bg-slate-500 flex items-center justify-center">
                    {movie.title || "Loading..."}
                </div>}>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                         className={'w-full h-[270px] rounded-lg hover:shadow-2xl'}/>
                </React.Suspense>
                <div className="absolute top-0 right-0">
                    <div className=" text-white rounded-bl-lg rounded-tr-lg bg-black bg-opacity-50 font-bold">
                        Rating: {movie.vote_average}
                    </div>
                </div>
            </div>
    );
}

export default Poster;
