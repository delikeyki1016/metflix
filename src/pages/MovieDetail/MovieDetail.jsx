import { useEffect, useState } from "react";
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
        const opts = {
            height: "510",
            width: "100%",
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                rel: 0,
            },
        };

        return <YouTube videoId={selectedVideo} opts={opts} />;
    }

    const handleModal = (video) => {
        setSelectedVideo(video.key);
        setShowModal(true);
    };

    const ReviewBox = ({ reviewText }) => {
        const [showMoreText, setShowMoreText] = useState(false);
        const limitText = 400;
        const isLongText = reviewText.length > limitText;
        // useEffect를 안쓰면 랜더링 도중에 상태값이 바뀌어서 계속 리랜더링 되어 too many re-render가 됨
        useEffect(() => {
            if (isLongText) {
                setShowMoreText(true);
            }
        }, [isLongText]);
        return (
            <>
                <p className={showMoreText ? "moreText" : ""}>{reviewText} </p>
                {isLongText && (
                    <Badge
                        role="button"
                        size="sm"
                        bg="secondary"
                        onClick={() => setShowMoreText(!showMoreText)}
                    >
                        {showMoreText ? "+ more" : "- less"}
                    </Badge>
                )}
            </>
        );
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

                    {movieVideoList?.length > 0 && (
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
            {/* 1. 글자수가 400개가 넘어가면 텍스트는 말줄임 되고 더보기 버튼이 표시, */}
            {/* 2. 더보기 버튼을 클릭하면 다보기 */}
            {/* 3. 접기 버튼을 클릭하면 다시 원래 상태로  */}
            {movieReviews?.length > 0 && (
                <Row>
                    <Col lg={12}>
                        <h4 className="mt-5">review</h4>
                        {movieReviews.map((review, index) => (
                            <div key={index} className="review-box">
                                <ReviewBox reviewText={review.content} />
                                <div className="review-author">
                                    - author : {review.author}
                                </div>
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
