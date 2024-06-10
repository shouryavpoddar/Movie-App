import SearchBar from "./Components/SearchBar";
import VideoComponent from "./Components/VideoComponent";
import Poster from "./Components/Poster";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function SearchPage() {
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
            <div className={'grid grid-cols-5 gap-4'}>
                {movies?.map((movie) => {
                    if(movie.poster_path) return <Poster key={movie.id} movie={movie}/>
                })}
            </div>
        </div>)
}