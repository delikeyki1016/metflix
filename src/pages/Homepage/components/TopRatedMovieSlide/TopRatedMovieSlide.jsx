import CommonSlide from "../../../../common/CommonSlide/CommonSlide";
import { responsive } from "../../../../constants/responsive";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";

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
            responsive={responsive}
        />
    );
};
export default TopRatedMovieSlide;
