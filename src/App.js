import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./Home";
import MoviePage from "./MoviePage";
import {Provider} from "react-redux";
import {store} from "./State Manager/store";
import SearchPage from "./SearchPage";

function App() {
  return (
      <Provider store={store}>
          <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie" element={<MoviePage />} />
                <Route path='/search' element={<SearchPage />} />
            </Routes>
          </Router>
      </Provider>
  );
}

export default App;
