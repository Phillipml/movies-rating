import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Movie.css";
import MovieCard from "../components/MovieCard";
import {
  FaAudioDescription,
  FaDigitalTachograph,
  FaHourglass,
  FaWallet,
} from "react-icons/fa";
const moviesURL = import.meta.env.VITE_API_ROOT;
const apiKey = import.meta.env.VITE_API_KEY;
const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };
  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieURL = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieURL);
  }, []);

  return (
    <div className="moviePage">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <FaWallet />
              Budget
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <FaDigitalTachograph />
              Revenue
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <FaHourglass />
              Run Time
            </h3>
            <p>{movie.runtime} min</p>
          </div>
          <div className="info description">
            <h3>
              <FaAudioDescription />
              Description
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
