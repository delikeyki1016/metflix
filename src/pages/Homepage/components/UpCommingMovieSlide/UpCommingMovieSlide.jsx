import CommonSlide from "../../../../common/CommonSlide/CommonSlide";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import { responsive } from "../../../../constants/responsive";

const UpCommingMovieSlide = () => {
    const { data, isLoading, isError, error } =
        usePopularMoviesQuery("upcoming");
    console.log("upcoming:", data);
    return (
        <CommonSlide
            data={data}
            isLoading={isLoading}
            isError={isError}
            error={error}
            type="Upcomming"
            responsive={responsive}
        />
    );
};
export default UpCommingMovieSlide;
