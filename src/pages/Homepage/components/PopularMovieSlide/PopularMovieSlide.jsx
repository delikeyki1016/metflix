import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import CommonSlide from "../CommonSlide/CommonSlide";

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
        />
    );
};
export default PopularMovieSlide;
