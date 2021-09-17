import React, { useState, useEffect } from "react";

function PopularMovieList(props) {
    const imgURL = "https://image.tmdb.org/t/p/w500"
    const [popularMovies, setPopularMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        const url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=645b84c0424790ef23fda061c7c0aa17&page=1";
        showPopularMovies(url);
    }, [])

    function getRating(rating) {
        if (rating >= 8) {
            return "green"
        } else if (rating >= 5) {
            return "yellow"
        } else {
            return "red"
        }
    }

    function handleClick() {
        const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=645b84c0424790ef23fda061c7c0aa17&page=${currentPage + 1}`;
        showPopularMovies(url)
    }

    function showPopularMovies(path) {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                setPopularMovies([...popularMovies, ...response.results])
                setCurrentPage(response.page);
            })
    }
    return (<>
        {popularMovies.map((movie, index) => (
            <div key={movie.id} className="movie-container">
                <img src={imgURL + movie.poster_path} alt="movie" />
                <div className="description">
                    <h4 className="overview">{movie.overview}</h4>
                    <button onClick={() => props.onAdd(movie)} className="addButton">{props.buttonText}</button>
                </div>
                <div className="info">
                    <h3>{movie.title}</h3>
                    <span className={getRating(movie.vote_average)}>{movie.vote_average}</span>
                </div>
            </div>
        ))}
        <button className="loadMore" onClick={handleClick}>{props.seeMoreText}</button>
    </>)
}



export default PopularMovieList;