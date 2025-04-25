import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useMovieGenreQuery } from "../../hooks/useMoiveGenre";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import "./MoviePage.style.css";
import noResultImg from "../../assets/no-result.png";

// 무비페이지로 오는 경로 2가지
// nav바에서 클릭해서 온 경우 ==> popularMovie 보여주기
// 키워드 입력으로 온 경우 ==> keyword 관련 영화를 보여줌

// 페이지네이션 설치
// page state 만들기
// page 클릭 시 page 바꿔주기
// page 값이 바뀔 때 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {
    const [query, setQuery] = useSearchParams();
    console.log("쿼리1", query);
    const [page, setPage] = useState(1);
    const keyword = query.get("q");
    const prevKeyword = useRef(keyword);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [popularity, setPopularity] = useState("");
    // 무비리스트 쿼리 호출
    const { data, isLoading, isError, error } = useSearchMovieQuery({
        keyword,
        page,
        genre: selectedGenre,
        popularity,
    });
    console.log("dd", data);
    // 장르 쿼리 호출
    const {
        data: genreList = [],
        isLoading: genreLoading,
        isError: genreError,
    } = useMovieGenreQuery();

    // 키워드가 바뀌면 페이지 1로 초기화
    useEffect(() => {
        if (prevKeyword.current !== keyword) {
            setPage(1);
            prevKeyword.current = keyword;
            setSelectedGenre("");
            setPopularity("");
        }
    }, [keyword]);

    const handlePageClick = ({ selected }) => {
        setPage(selected + 1);
    };

    const handleGenreChange = (e) => {
        setSelectedGenre(e.target.value);
        setPage(1);
    };

    const handlePopularity = (e) => {
        setPopularity(e.target.value);
        setPage(1);
    };

    if (isLoading || genreLoading) {
        return (
            <Spinner animation="border" variant="danger" className="spinner" />
        );
    }

    if (isError) {
        return <Alert variant={"danger"}>{error.message}</Alert>;
    }

    if (genreError) {
        return <Alert variant={"danger"}>Failed to load genres.</Alert>;
    }

    return (
        <section>
            <Row>
                <Col lg={3} className="select-wrap">
                    <Form.Select
                        aria-label="Select genre"
                        value={selectedGenre}
                        onChange={handleGenreChange}
                    >
                        <option value="">All Genres</option>
                        {genreList.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </Form.Select>
                    {(keyword || selectedGenre) && (
                        <Form.Select
                            aria-label="Select popularity"
                            value={popularity}
                            onChange={handlePopularity}
                        >
                            <option value="">popularity</option>
                            <option key={1} value="desc">
                                High popularity
                            </option>
                            <option key={2} value="asc">
                                Low popularity
                            </option>
                        </Form.Select>
                    )}
                </Col>
            </Row>

            <Row className="mt-3">
                {data?.results.length > 0 ? (
                    data?.results.map((movie, index) => (
                        <Col key={index} lg={2} md={4} sm={6} xs={12}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                ) : (
                    <Col className="no-result">
                        <img src={noResultImg} alt="no result" />
                        <div>
                            There are no movies matching the{" "}
                            <span>"{keyword}"</span> you searched for.
                        </div>
                        <div>{"Please search again."}</div>
                    </Col>
                )}
            </Row>
            {data?.results.length > 0 && (
                <Row className="custom-style-pagination">
                    <ReactPaginate
                        nextLabel=">"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={
                            data?.total_pages > 101 ? 100 : data?.total_pages
                        } // 전체 페이지
                        previousLabel="<"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={page - 1} // 현재 페이지
                    />
                </Row>
            )}
        </section>
    );
};

export default MoviePage;
