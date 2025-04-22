import { useState } from "react";
import { Alert, Badge, Button, Col, Row, Spinner } from "react-bootstrap";
import { useMovieDetailQuery } from "../../hooks/useMovieDeail";
import { useMovieGenreQuery } from "../../hooks/useMoiveGenre";
import { useMovieVideoQuery } from "../../hooks/useMovieVideo";
import "./MovieDetail.style.css";
import Modal from "react-bootstrap/Modal";
import YouTube from "react-youtube";
import { useMovieReviewQuery } from "../../hooks/useMovieReview";

const MovieDetail = () => {
    const url = new URL(window.location.href);
    const pathId = url.pathname.split("/")[2];

    const { data, isLoading, isError, error } = useMovieDetailQuery(pathId);

    const { data: genreData } = useMovieGenreQuery();
    const { data: movieVideoList } = useMovieVideoQuery(pathId);
    console.log("movieVideos", movieVideoList);
    const [showModal, setShowModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const { data: movieReviews } = useMovieReviewQuery(pathId);
    // console.log("reviews", movieReviews);

    const showGenre = (genreIdList) => {
        if (!genreData) return [];
        const genreNameList = genreIdList.map((item) => {
            // console.log("item", item);
            const genreObj = genreData.find((genre) => genre.id === item.id);
            // console.log("genreObj", genreObj);
            return genreObj.name;
        });

        return genreNameList;
    };

    if (isLoading) {
        return (
            <Spinner animation="border" variant="danger" className="spinner" />
        );
    }
    if (isError) {
        return <Alert variant={"danger"}>{error.message}</Alert>;
    }

    function showVideo() {
        const onPlayerReady = (event) => {
            // access to player in all event handlers via event.target
            event.target.pauseVideo();
        };

        const opts = {
            height: "510",
            width: "760",
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                rel: 0,
            },
        };

        return (
            <YouTube
                videoId={selectedVideo}
                opts={opts}
                onReady={onPlayerReady}
            />
        );
    }

    const handleModal = (video) => {
        setSelectedVideo(video.key);
        setShowModal(true);
    };

    return (
        <section className="movie-info">
            <Row>
                <Col lg={5}>
                    <div className="movie-poster">
                        <img
                            src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`}
                        />
                    </div>
                </Col>
                <Col lg={7}>
                    <h1>{data.title}</h1>
                    <div className="mb-3">{data.tagline}</div>
                    <div className="badge-wrap">
                        {showGenre(data.genres).map((genre, index) => (
                            <Badge bg="warning" key={index}>
                                {genre}
                            </Badge>
                        ))}
                    </div>
                    <ul>
                        <li>average : {data.vote_average}</li>
                        <li>populariry : {data.popularity}</li>
                        <li>
                            grade :{" "}
                            {data.adult ? (
                                <Badge bg="danger">Adult</Badge>
                            ) : (
                                <Badge bg="success">All</Badge>
                            )}
                        </li>

                        {data.homepage && (
                            <li>
                                website :{" "}
                                <a href={data.homepage} target="_blank">
                                    {data.homepage}
                                </a>
                            </li>
                        )}
                        <li>release : {data.release_date}</li>
                        <li>run time : {data.runtime} min</li>
                        <li>budget : ${data.budget.toLocaleString("en-US")}</li>
                    </ul>
                    <h4 className="mt-5">overview</h4>
                    <div>{data.overview}</div>

                    {movieVideoList && (
                        <>
                            <h4 className="mt-5">video</h4>
                            <div className="video-list">
                                {movieVideoList.map((video, index) => (
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        key={index}
                                        onClick={() => handleModal(video)}
                                    >
                                        {video.name}
                                    </Button>
                                ))}
                            </div>
                        </>
                    )}
                </Col>
            </Row>
            {movieReviews?.length > 0 && (
                <Row>
                    <Col lg={12}>
                        <h4 className="mt-5">review</h4>
                        {movieReviews.map((review, index) => (
                            <div key={index} className="review-box">
                                <p>{review.content}</p>
                                {review.author}
                            </div>
                        ))}
                    </Col>
                </Row>
            )}

            <Modal
                className="modal-style"
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Movie Video
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{showVideo()}</Modal.Body>
            </Modal>
        </section>
    );
};
export default MovieDetail;
