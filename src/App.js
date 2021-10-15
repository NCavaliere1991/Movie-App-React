import React, { useState, useEffect } from "react";
import MovieHeading from "./components/MovieHeading";
import MovieList from "./components/MovieList";
import PopularMovieList from "./components/PopularMovieList"
import './App.css';
import SearchBar from "./components/SearchBar"

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState([]);

  function searchMovie(searchTerm) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=645b84c0424790ef23fda061c7c0aa17&query=${searchTerm}`;
    fetch(url).then(res => res.json()).then(data => {
      if (searchTerm) {
        setMovies(data.results)
      }
    });

  }

  useEffect(() => {
    searchMovie(searchTerm);
  }, [searchTerm]);


  function addToWatchlist(movie) {
    setWatchlist((prevMovies) => {
      if (!prevMovies.includes(movie)) {
        return [...prevMovies, movie]
      }
    })
  }

  function deleteFromWatchlist(movie) {
    setWatchlist((prevMovies) => {
      return prevMovies.filter((film) => {
        return film.id !== movie.id
      })
    })
  }



  return (<div>
    <nav>
      <MovieHeading text="Find Movies" />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </nav>
    <section>
      <MovieList movies={movies} key={movies.id} onAdd={addToWatchlist} buttonText="Add To WatchList" />
    </section>
    <nav>
      <MovieHeading text="Popular Movies" />
    </nav>
    <section>
      <PopularMovieList onAdd={addToWatchlist} buttonText="Add To WatchList" seeMoreText="Load More" />
    </section>
    <nav>
      <MovieHeading text="Watchlist" />
    </nav>
    <section>
      <MovieList movies={watchlist} key={watchlist.id} onAdd={deleteFromWatchlist} buttonText="Remove from WatchList" />
    </section>
  </div>)
}

export default App;
