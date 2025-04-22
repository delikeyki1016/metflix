import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, genre }) => {
    if (keyword) {
        return api.get(`/search/movie?query=${keyword}&page=${page}`);
    }

    if (genre) {
        return api.get(`/discover/movie?with_genres=${genre}&page=${page}`);
    }

    return api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page, genre }) => {
    return useQuery({
        queryKey: ["movie-search", keyword, page, genre],
        queryFn: () => fetchSearchMovie({ keyword, page, genre }),
        select: (result) => result.data,
    });
};
