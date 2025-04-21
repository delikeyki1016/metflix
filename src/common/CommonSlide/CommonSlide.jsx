import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../MovieCard/MovieCard";
import "./CommonSlide.style.css";
import { Alert, Spinner } from "react-bootstrap";

const CommonSlide = ({ data, isLoading, isError, error, type, responsive }) => {
    if (isLoading) {
        return (
            <Spinner animation="border" variant="danger" className="spinner" />
        );
    }
    if (isError) {
        return <Alert variant={"danger"}>{error.message}</Alert>;
    }

    return (
        <section>
            <h3>{type} Movies</h3>
            <Carousel
                infinite={true}
                centerMode={true}
                containerClass="carousel-container"
                responsive={responsive}
                showDots={true}
            >
                {data.results.map((movie, index) => (
                    <MovieCard movie={movie} type={type} ranking={index} />
                ))}
            </Carousel>
        </section>
    );
};
export default CommonSlide;
