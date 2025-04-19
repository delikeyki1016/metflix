import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Spinner from "react-bootstrap/Spinner";
import "./Banner.style.css";

const Banner = () => {
    const { data, isLoading, isError, error } =
        usePopularMoviesQuery("now_playing");
    // console.log("now playing", data);
    if (isLoading) {
        return <Spinner animation="border" variant="danger" />;
    }
    if (isError) {
        return <Alert variant={"danger"}>{error.message}</Alert>;
    }
    return (
        <div
            style={{
                backgroundImage: `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2/${data.results[0].poster_path})`,
            }}
            className="banner text-white"
        >
            <div className="banner-text-area">
                <h1>{data?.results[0].title}</h1>
                <p>{data?.results[0].overview}</p>
            </div>
        </div>
    );
};
export default Banner;
