import {useQuery, useQueryClient} from "@tanstack/react-query";
import {fetchMoviesByGenre} from "./ApiServicer/Api";
import React from "react";
import Poster from "./Components/Poster";
import SearchBar from "./Components/SearchBar";
import {useNavigate} from "react-router-dom";

export default function CategoriesPage(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const screenIndex = queryClient.getQueryData('screenIndex');
    const { data: genreMovies, isLoading, isError} = useQuery({
        queryKey: ['categories',screenIndex],
        queryFn: () => fetchMoviesByGenre(screenIndex),
        enabled: !!screenIndex
    });

    if(isError) return <div>Error</div>


    return (
        <div className={"flex flex-col  justify-center"}>
        <div className={"flex flex-row items-center mr-5"}>
            <button onClick={() => {
                navigate('/')
            }} className={"bg-gray-800 ml-2.5 p-2 h-10 rounded-2xl text-white items-center"}>Home
            </button>
            <SearchBar/>
        </div>
    <div className={'grid grid-cols-5 gap-4'}>
        { isLoading? <>
            <div
                className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>
            <div
                className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>
            <div
            className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>
            <div
            className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>
            <div
            className="animate-pulse rounded-3xl w-full h-[270px] bg-slate-200 flex items-center justify-center"></div>
            </>
            : genreMovies?.map((movie) => (
            <Poster key={movie.id} movie={movie}/>
        )) }
    </div>
        </div>
)

}