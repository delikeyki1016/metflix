import Badge from "react-bootstrap/Badge";
import "./MovieCard.style.css";

const MovieCard = ({ movie }) => {
    return (
        <div
            style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${movie.poster_path})`,
            }}
            className="movie-card"
        >
            <div className="overlay">
                <h4>{movie.title}</h4>

                <div className="movie-info">
                    <div className="badge-wrap">
                        {movie.genre_ids.map((id) => (
                            <Badge bg="danger">{id}</Badge>
                        ))}
                    </div>
                    <ul>
                        <li>vote average : {movie.vote_average}</li>
                        <li>populariry : {movie.popularity}</li>
                        <li>grade : {movie.adult ? "18+" : "18-"}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default MovieCard;
