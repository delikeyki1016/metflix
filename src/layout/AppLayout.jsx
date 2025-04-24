import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Search } from "react-bootstrap-icons";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const AppLayout = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const searchByKeyword = (event) => {
        event.preventDefault();
        //url 바꿔주기
        navigate(`/movies?q=${keyword}`);
        setKeyword("");
    };
    return (
        <>
            <Navbar expand="lg" data-bs-theme="dark" className="nav-bar">
                <Container
                    fluid
                    style={{
                        maxWidth: 1600,
                        backgroundColor: "#000",
                        paddingBottom: "10px",
                    }}
                >
                    <Navbar.Brand>
                        <img src="/logo.png" width="120" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link onClick={() => navigate("/")}>
                                Home
                            </Nav.Link>
                            <Nav.Link onClick={() => navigate("/movies")}>
                                Movies
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={searchByKeyword}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                value={keyword}
                                onChange={(event) =>
                                    setKeyword(event.target.value)
                                }
                            />
                            <Button variant="outline-danger" type="submit">
                                <Search />
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* 라우터 안의 자손들을 가져옴 */}
            <div className="content-wrap">
                <Outlet />
            </div>
        </>
    );
};
export default AppLayout;
