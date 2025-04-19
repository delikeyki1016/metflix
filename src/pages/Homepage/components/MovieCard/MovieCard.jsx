import Badge from "react-bootstrap/Badge";
import "./MovieCard.style.css";

const MovieCard = ({ movie, type, ranking }) => {
    return (
        <div
            style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${movie.poster_path})`,
            }}
            className="movie-card"
        >
            {type === "Top rated" && (
                <div className="ranking">{ranking + 1}</div>
            )}
            <div className="overlay">
                <h4>{movie.title}</h4>

                <div className="movie-info">
                    <div className="badge-wrap">
                        {movie.genre_ids.map((id, index) => (
                            <Badge bg="warning" key={index}>
                                {id}
                            </Badge>
                        ))}
                    </div>
                    <ul>
                        <li>average : {movie.vote_average}</li>
                        <li>populariry : {movie.popularity}</li>
                        <li>
                            grade :{" "}
                            {movie.adult ? (
                                <Badge bg="danger">Adult</Badge>
                            ) : (
                                <Badge bg="success">All</Badge>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default MovieCard;
