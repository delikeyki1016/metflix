import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

// 무비페이지로 오는 경로 2가지
// nav바에서 클릭해서 온 경우 ==> popularMovie 보여주기
// 키워드 입력으로 온 경우 ==> keyword 관련 영화를 보여줌

// 페이지네이션 설치
// page state 만들기
// page 클릭 시 page 바꿔주기
// page 값이 바뀔 때 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {
    const [query, setQuery] = useSearchParams();
    const [page, setPage] = useState(1);
    const keyword = query.get("q");

    const { data, isLoading, isError, error } = useSearchMovieQuery({
        keyword,
        page,
    });
    console.log("qq", data);

    const handlePageClick = ({ selected }) => {
        console.log("page:", selected);
        setPage(selected + 1);
    };

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
            <Container>
                <Row>
                    <Col lg={4} xs={12}>
                        "filter area"
                    </Col>
                    <Col lg={8} xs={12}>
                        <Row>
                            {data?.results.map((movie, index) => (
                                <Col key={index} lg={4} xs={12}>
                                    <MovieCard movie={movie} />
                                </Col>
                            ))}
                        </Row>
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={data?.total_pages} // 전체 페이지
                            previousLabel="< previous"
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
                            forcePage={page - 1} // 현재페이지
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
export default MoviePage;
