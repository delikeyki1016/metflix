import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import CommonSlide from "../CommonSlide/CommonSlide";

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
            title="Upcomming"
        />
    );
};
export default UpCommingMovieSlide;
