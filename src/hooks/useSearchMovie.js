import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = async ({ keyword, page, genre, popularity }) => {
    // 키워드가 있는 경우
    if (keyword) {
        return api.get(
            `/discover/movie?with_text_query=${keyword}&sort_by=popularity.${popularity}&with_genres=${genre}&page=${page}`
        );
    }

    // 키워드는 없고 장르가 있는 경우
    if (genre) {
        return api.get(
            `/discover/movie?with_genres=${genre}&sort_by=popularity.${popularity}&page=${page}`
        );
    }

    // 무비 진입 시 기본 popular movie
    return api.get(`/movie/popular?page=${page}`);
};

// React Query hook
export const useSearchMovieQuery = ({ keyword, page, genre, popularity }) => {
    return useQuery({
        queryKey: ["movie-search", keyword, page, genre, popularity],
        queryFn: () => fetchSearchMovie({ keyword, page, genre, popularity }),
        select: (result) => result.data,
    });
};
