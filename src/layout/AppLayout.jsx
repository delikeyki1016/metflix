import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Search } from "react-bootstrap-icons";
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar
                expand="lg"
                className="bg-body-tertiary"
                bg="dark"
                data-bs-theme="dark"
                style={{
                    position: "fixed",
                    width: "100%",
                    zIndex: 9,
                    height: 70,
                    top: 0,
                }}
            >
                <Container fluid style={{ maxWidth: 1600 }}>
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
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-danger">
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
