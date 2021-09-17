import React from "react";

function MovieList(props) {
    const imgURL = "https://image.tmdb.org/t/p/w500"

    function getRating(rating) {
        if (rating >= 8) {
            return "green"
        } else if (rating >= 5) {
            return "yellow"
        } else {
            return "red"
        }
    }

    return (
        <>
            {props.movies.map((movie, index) => (
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

        </>
    )
}

export default MovieList;