import CommonSlide from "../../../../common/CommonSlide/CommonSlide";
import { responsive } from "../../../../constants/responsive";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";

const PopularMovieSlide = () => {
    const { data, isLoading, isError, error } =
        usePopularMoviesQuery("popular");
    console.log("popular:", data);
    return (
        <CommonSlide
            data={data}
            isLoading={isLoading}
            isError={isError}
            error={error}
            type="Popular"
            responsive={responsive}
        />
    );
};
export default PopularMovieSlide;
