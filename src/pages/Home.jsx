import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "../defaultCSS/MovieGrid.css";
const moviesURL = import.meta.env.VITE_API_ROOT;
const apiKey = import.meta.env.VITE_API_KEY;
const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTopMovies(data.results);
  };

  useEffect(() => {
    const topRatedURL = `${moviesURL}top_rated?${apiKey}`;
    getTopRatedMovies(topRatedURL);
  }, []);
  return (
    <div className="container">
      <h2 className="title">Best Movies:</h2>
      {topMovies.length === 0 && <p>Carregando...</p>}
      <div className="moviesContainer">
        {topMovies &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
