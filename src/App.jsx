import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import Homepage from "./pages/Homepage/Homepage";
import NotFound from "./pages/Notfound/Notfound";

// 홈, 영화 전체(서치), 영화 상세
function App() {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Homepage />} />
                <Route path="movies">
                    <Route index element={<MoviePage />} />
                    <Route path=":id" element={<MovieDetail />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
export default App;
