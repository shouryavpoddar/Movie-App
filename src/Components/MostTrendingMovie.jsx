import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useQueryClient} from "@tanstack/react-query";

export default function MostTrendingMovie({movie}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const handleClick = () => {
        queryClient.invalidateQueries('movie');
        queryClient.setQueryData('movieId', movie.id)
        // dispatch(fetchMovie(movie.id));
        navigate('/movie');
    }

    return (
        <div onClick={handleClick}
             className="relative w-full bg-contain bg-no-repeat rounded-3xl me-4 hover:bg-black shadow-lg hover:transition-shadow hover:duration-300 shadow-gray-500"
        >
            <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                 className={'w-full h-[600px] rounded-3xl'}/>
            <div className="absolute top-0">
                <span className={" bg-white bg-opacity-50 font-bold mt-2.5 ml-2.5 rounded-tl"}>Most Trending Movie: {movie?.title}</span>
            </div>
            <div className={'absolute bottom-0.5 right-0.5'}>
                <button onClick={handleClick} className={'bg-white bg-opacity-50 hover:bg-opacity-100 mb-5 mr-3 p-4 rounded-3xl'}>More info</button>
            </div>
        </div>
    )
}