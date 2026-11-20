import React, { useEffect, useState } from 'react';
import { fetchNowPlayingMovies, type ApiMovie } from '../services/movieService';
import { MovieDashboardView } from './MovieDashboardView';

export type SortField = 'title' | 'vote_average' | 'popularity';
export type SortOrder = 'asc' | 'desc';

export interface DashboardKpis {
    totalCount: number;
    highRatedSharePct: string;
    avgRating: string;
    avgRatingPct: string;
    maxPopularity: number;
    topPopularitySharePct: string;
}

export const MovieDashboardContainer: React.FC = () => {
    const [movies, setMovies] = useState<ApiMovie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [sortField, setSortField] = useState<SortField>('vote_average');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    useEffect(() => {
        let active = true;

        setLoading(true);
        setError(null);

        fetchNowPlayingMovies()
            .then((data) => {
                if (!active) return;
                setMovies(data);
                setLoading(false);
            })
            .catch((err: unknown) => {
                if (!active) return;
                setError(err instanceof Error ? err.message : 'Невідома помилка завантаження');
                setLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortOrder(field === 'title' ? 'asc' : 'desc');
        }
    };

    const sortedMovies = [...movies].sort((a, b) => {
        if (sortField === 'title') {
            return sortOrder === 'asc'
                ? a.title.localeCompare(b.title, 'uk')
                : b.title.localeCompare(a.title, 'uk');
        }

        const diff = a[sortField] - b[sortField];
        return sortOrder === 'asc' ? diff : -diff;
    });

    const totalCount = movies.length;

    const highRatedCount = movies.filter((m) => m.vote_average >= 7.0).length;
    const highRatedSharePct =
        totalCount > 0 ? `+${((highRatedCount / totalCount) * 100).toFixed(1)}% рейтинг ≥ 7.0` : '0.0%';

    const avgRatingNum =
        totalCount > 0
            ? movies.reduce((sum, item) => sum + item.vote_average, 0) / totalCount
            : 0;
    const avgRating = totalCount > 0 ? avgRatingNum.toFixed(1) : '0.0';
    const avgRatingPct = `${((avgRatingNum / 10) * 100).toFixed(1)}% від макс. балу`;

    const maxPopularity =
        totalCount > 0 ? Math.round(Math.max(...movies.map((item) => item.popularity))) : 0;
    const totalPopularity = movies.reduce((sum, item) => sum + item.popularity, 0);
    const topPopularitySharePct =
        totalPopularity > 0
            ? `${((Math.max(...movies.map((item) => item.popularity)) / totalPopularity) * 100).toFixed(1)}% частка лідера`
            : '0.0%';

    const kpis: DashboardKpis = {
        totalCount,
        highRatedSharePct,
        avgRating,
        avgRatingPct,
        maxPopularity,
        topPopularitySharePct,
    };

    return (
        <MovieDashboardView
            movies={sortedMovies}
            loading={loading}
            error={error}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            kpis={kpis}
        />
    );
};