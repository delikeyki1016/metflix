import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = (type) => {
    return api.get(`/movie/${type}`);
};

export const usePopularMoviesQuery = (type) => {
    // console.log("type", type);
    return useQuery({
        queryKey: [`movie-${type}`],
        queryFn: () => fetchPopularMovies(type),
        select: (result) => result.data,
    });
};
