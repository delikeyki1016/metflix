import { Alert, Spinner } from "react-bootstrap";

const LoadingErrorHandler = ({ isLoading, isError, error, children }) => {
    if (isLoading) {
        return (
            <Spinner animation="border" variant="danger" className="spinner" />
        );
    }
    if (isError) {
        return <Alert variant={"danger"}>{error.message}</Alert>;
    }
    return children;
};
export default LoadingErrorHandler;
