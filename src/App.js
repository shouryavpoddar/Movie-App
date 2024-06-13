import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./Home";
import MoviePage from "./MoviePage";
import {Provider} from "react-redux";
import {store} from "./State Manager/store";
import SearchPage from "./SearchPage";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import CategoriesPage from "./CategoriesPage";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <Provider store={store}>
              <Router>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/movie" element={<MoviePage />} />
                      <Route path='/search' element={<SearchPage />} />
                      <Route path='/genre' element={<CategoriesPage/>} />
                  </Routes>
              </Router>
          </Provider>
      </QueryClientProvider>
  );
}

export default App;
