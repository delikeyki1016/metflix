import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import CommonSlide from "../CommonSlide/CommonSlide";
const TopRatedMovieSlide = () => {
    const { data, isLoading, isError, error } =
        usePopularMoviesQuery("top_rated");
    console.log("top_rated:", data);
    return (
        <CommonSlide
            data={data}
            isLoading={isLoading}
            isError={isError}
            error={error}
            type="Top rated"
        />
    );
};
export default TopRatedMovieSlide;
