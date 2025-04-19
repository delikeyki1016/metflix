// 1. 배너넣기 : popular의 첫번째 아이템을 보여주기
// 2. popular movie 가져오기
// 3. top rated movie 가져오기
// 4. upcoming move 가져오기

import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";

const Homepage = () => {
    return (
        <>
            <Banner />
            <PopularMovieSlide />
        </>
    );
};
export default Homepage;
