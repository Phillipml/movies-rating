import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "../defaultCSS/MovieGrid.css";

const searchURL = import.meta.env.VITE_API_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;
const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (searchURL) => {
    const res = await fetch(searchURL);
    const data = await res.json();

    setMovies(data.results);
  };

  useEffect(() => {
    const searchQueryMovie = `${searchURL}?${apiKey}&query=${query}`;
    getSearchedMovies(searchQueryMovie);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Result for: <span className="query-text">{query}</span>
      </h2>
      {movies.length === 0 && <p>Loading...</p>}
      <div className="moviesContainer">
        {movies &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
