import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";

import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

function Poster({movie}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const handleClick = () => {
        queryClient.invalidateQueries('movie');
        queryClient.setQueryData('movieId', movie.id)
        // dispatch(fetchMovie(movie.id));
        navigate('/movie');
    }

    return (
            <div onClick={handleClick}
                 className=" me-1 relative bg-contain bg-no-repeat rounded-3xl shadow-xl"
            >
                <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                     className={'w-full h-[270px] rounded-lg hover:shadow-2xl'}/>
                <div className="absolute top-0 right-0">
                    <div className=" text-white rounded-bl-lg rounded-tr-lg bg-black bg-opacity-50 font-bold">
                        Rating: {movie.vote_average}
                    </div>
                </div>
            </div>
    );
}

export default Poster;
