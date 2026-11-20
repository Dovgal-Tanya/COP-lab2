const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '15a3557b24c0816b81407a3323404423';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface ApiMovie {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
}

export const fetchNowPlayingMovies = async (): Promise<ApiMovie[]> => {
    const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=uk-UA&page=1`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`TMDB помилка (${response.status}). Перевір API-ключ.`);
    }

    const data = await response.json();
    return Array.isArray(data.results) ? data.results : [];
};