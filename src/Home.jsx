import Sidebar from "./Components/Sidebar";
import Poster from "./Components/Poster";
import SearchBar from "./Components/SearchBar";
import MostTrendingMovie from "./Components/MostTrendingMovie";
import genre from "./genre.json";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesMovies, setCategory } from "./State Manager/categoriesSlice";
import { fetchNewReleaseMovies, fetchTopRatedMovies, fetchTrendingMovies } from "./State Manager/homePageSlice";
import { Suspense, useEffect } from "react";

function Loading() {
    return <div className={"animate-pulse bg-slate-500 w-full h-[1000px]"}>Loading...</div>;
}

export default function Home() {
    const watchlist = useSelector(state => state.watchlist.movies);
    const dispatch = useDispatch();
    const categorieMovies = useSelector(state => state.categories.movies);
    const { tendingMovies, newReleaseMovies, topRatedMovies } = useSelector(state => state.homePage);

    const changeScreen = (screenIndex) => {
        if (genre.genres.reduce((acc, genre) => acc || genre.id === screenIndex, false)) {
            console.log(screenIndex);
            dispatch(fetchCategoriesMovies(screenIndex));
        }
    };

    useEffect(() => {
        (function () {
            dispatch(fetchTopRatedMovies());
            dispatch(fetchNewReleaseMovies());
            dispatch(fetchTrendingMovies());
        })();
    }, [dispatch]);

    return (
        <Sidebar defaultScreen={'Home'} onChange={changeScreen}>
            <Sidebar.Bar>
                <Sidebar.ItemList>
                    <Sidebar.Item screenIndex={'Home'}>Home</Sidebar.Item>
                    <Sidebar.Item screenIndex={'Watchlist'}>Watchlist</Sidebar.Item>
                    <Sidebar.CollapsibleSection title={'Categories'}>
                        {genre.genres.map((genre) => {
                            return <Sidebar.Item key={genre.id} screenIndex={genre.id}>{genre.name}</Sidebar.Item>;
                        })}
                    </Sidebar.CollapsibleSection>
                </Sidebar.ItemList>
            </Sidebar.Bar>
            <Sidebar.Body>
                <Sidebar.Screen screenIndex={'Home'}>
                    <SearchBar />
                    <MostTrendingMovie movie={tendingMovies[0]} />
                    <div className={'flex flex-col space-y-10'}>
                        <div className={'mt-10 items-center justify-start'}>
                            <h1 className={'font-medium text-2xl mb-5'}>Most Trending</h1>
                            <div className={'flex flex-row gap-4 justify-between'}>
                                {tendingMovies.map((movie, index) => {
                                    if (0 < index && index < 6) return <Poster key={movie.id} movie={movie} />;
                                    return null;
                                })}
                            </div>
                        </div>
                        <div className={'mt-10 items-center justify-start'}>
                            <h1 className={'font-medium text-2xl mb-5'}>New Releases</h1>
                            <div className={'flex flex-row gap-4 justify-between'}>
                                {newReleaseMovies.map((movie, index) => {
                                    if (index < 5) return <Poster key={movie.id} movie={movie} />;
                                    return null;
                                })}
                            </div>
                        </div>
                        <div className={'mt-10 items-center justify-start'}>
                            <h1 className={'font-medium text-2xl mb-5'}>Top Rated Movies</h1>
                            <div className={'grid grid-cols-5 gap-4'}>
                                {topRatedMovies.map((movie, index) => {
                                    if (index < 5) return <Poster key={movie.id} movie={movie} />;
                                    return null;
                                })}
                            </div>
                        </div>
                    </div>
                </Sidebar.Screen>
                <Sidebar.Screen screenIndex={'Watchlist'}>
                    <h1 className={'font-medium text-2xl mb-5'}>Watchlist</h1>
                    <div className={'grid grid-cols-5 gap-4'}>
                        {watchlist.map((movie) => {
                            return <Poster key={movie.id} movie={movie} />;
                        })}
                    </div>
                </Sidebar.Screen>
                {genre.genres.map((genre) => {
                    return (
                        <Sidebar.Screen key={genre.id} screenIndex={genre.id}>
                            <h1 className={'font-medium text-2xl mb-5'}>{genre.name}</h1>
                            <div className={'grid grid-cols-5 gap-4'}>
                                {categorieMovies?.map((movie) => {
                                    return <Poster key={movie.id} movie={movie} />;
                                })}
                            </div>
                        </Sidebar.Screen>
                    );
                })}
            </Sidebar.Body>
        </Sidebar>
    );
}
