import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./CommonSlide.style.css";
import { Alert, Spinner } from "react-bootstrap";

const CommonSlide = ({ data, isLoading, isError, error, title }) => {
    if (isLoading) {
        return <Spinner animation="border" variant="danger" />;
    }
    if (isError) {
        return <Alert variant={"danger"}>{error.message}</Alert>;
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            // slidesToSlide: 3, // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            // slidesToSlide: 2, // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            // slidesToSlide: 1, // optional, default to 1.
        },
    };
    return (
        <section>
            <h3>{title} Movies</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                containerClass="carousel-container"
                responsive={responsive}
            >
                {data.results.map((movie, index) => (
                    <MovieCard movie={movie} key={index} />
                ))}
            </Carousel>
        </section>
    );
};
export default CommonSlide;
