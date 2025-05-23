import Badge from "react-bootstrap/Badge";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMoiveGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, type, ranking }) => {
    // console.log("받은영화정보", movie);
    const naviagte = useNavigate();
    //data: gendreData ==> 받은 데이터를 gendreData로 reName
    const { data: genreData } = useMovieGenreQuery();
    // console.log("genre:", gendreData);
    const showGenre = (genreIdList) => {
        if (!genreData) return [];
        const genreNameList = genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id);
            return genreObj.name;
        });

        return genreNameList;
    };

    return (
        <div
            style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${movie.poster_path})`,
            }}
            className="movie-card"
            onClick={() => naviagte(`/movies/${movie.id}`)}
        >
            {type === "Top rated" && (
                <div className="ranking">{ranking + 1}</div>
            )}
            <div className="overlay">
                <h4>{movie.title}</h4>

                <div className="movie-info-card">
                    <div className="badge-wrap">
                        {showGenre(movie.genre_ids).map((genre, index) => (
                            <Badge bg="warning" key={index}>
                                {genre}
                            </Badge>
                        ))}
                    </div>
                    <ul>
                        <li>⭐ {movie.vote_average.toFixed(2)}</li>
                        <li>❤️ {movie.popularity.toFixed(2)}</li>
                        <li>
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
