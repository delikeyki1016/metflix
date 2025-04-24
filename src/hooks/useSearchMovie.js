import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

// 키워드 텍스트를 ID로 변환하는 함수
const fetchKeywordId = async (keyword) => {
    if (!keyword) return null;
    const res = await api.get(`/search/keyword?query=${keyword}`);
    return res.data.results[0]?.id || null;
};

// 키워드 + 장르 조합, 또는 단독 검색에 대응
const fetchSearchMovie = async ({ keyword, page, genre, popularity }) => {
    // 키워드와 장르가 둘 다 있을 경우
    if (keyword && genre) {
        const keywordId = await fetchKeywordId(keyword);
        if (!keywordId) {
            return { data: { results: [], total_pages: 0, total_results: 0 } };
        }

        return api.get(
            `/discover/movie?with_genres=${genre}&with_keywords=${keywordId}&sort_by=popularity.${popularity}&page=${page}`
        );
    }

    // 키워드만 있을 경우
    if (keyword) {
        return api.get(
            `/search/movie?query=${keyword}&sort_by=popularity.${popularity}&page=${page}`
        );
    }

    // 장르만 있을 경우
    if (genre) {
        return api.get(
            `/discover/movie?with_genres=${genre}&sort_by=popularity.${popularity}&page=${page}`
        );
    }

    // 기본 인기 영화
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
