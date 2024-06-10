import { useDispatch } from "react-redux";
import { fetchSearchMovies } from "../State Manager/searchMovieSlice";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

export default function SearchBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchTerm);
        if (searchTerm.trim()) {
            dispatch(fetchSearchMovies(searchTerm));
        }
        navigate('/search');
        setSearchTerm("")
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="flex justify-start items-center w-full h-24">
            <div className="flex ml-3 bg-800 border bg-opacity-10 w-full h-10 rounded-2xl px-4 items-center">
                <form className="w-full ring-0" onSubmit={handleSubmit}>
                    <input
                        className="w-full ring-0 ring-transparent focus:outline-transparent"
                        type="text"
                        placeholder="Search for a movie..."
                        value={searchTerm}
                        onChange={handleChange}
                        aria-label="Search for a movie"
                    />
                </form>
            </div>
        </div>
    );
}
