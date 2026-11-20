import React from 'react';
import { type ApiMovie } from '../services/movieService';
import { type DashboardKpis, type SortField, type SortOrder } from './MovieDashboardContainer';
import { KpiCard } from './KpiCard';

interface MovieDashboardViewProps {
    movies: ApiMovie[];
    loading: boolean;
    error: string | null;
    sortField: SortField;
    sortOrder: SortOrder;
    onSort: (field: SortField) => void;
    kpis: DashboardKpis;
}

export const MovieDashboardView: React.FC<MovieDashboardViewProps> = ({
                                                                          movies,
                                                                          loading,
                                                                          error,
                                                                          sortField,
                                                                          sortOrder,
                                                                          onSort,
                                                                          kpis,
                                                                      }) => {
    const arrow = (field: SortField) =>
        sortField === field ? (sortOrder === 'asc' ? ' ↑' : ' ↓') : '';

    return (
        <div>
            {}
            <section style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                <KpiCard
                    title="Фільмів у прокаті (API)"
                    value={loading ? '—' : kpis.totalCount}
                    trend={loading ? 'Завантаження...' : kpis.highRatedSharePct}
                    isPositive={true}
                />
                <KpiCard
                    title="Середній рейтинг"
                    value={loading ? '—' : kpis.avgRating}
                    trend={loading ? 'Завантаження...' : kpis.avgRatingPct}
                    isPositive={true}
                />
                <KpiCard
                    title="Макс. популярність"
                    value={loading ? '—' : kpis.maxPopularity}
                    trend={loading ? 'Завантаження...' : kpis.topPopularitySharePct}
                    isPositive={true}
                />
            </section>

            <div style={boxStyle}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                        flexWrap: 'wrap',
                        gap: '10px',
                    }}
                >
                    <h2 style={{ margin: 0, color: '#f3e8ff', fontSize: '18px' }}>
                        ЛР2: Фільми у прокаті (TMDB)
                    </h2>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button type="button" onClick={() => onSort('title')} style={btnStyle}>
                            Назва{arrow('title')}
                        </button>
                        <button type="button" onClick={() => onSort('vote_average')} style={btnStyle}>
                            Рейтинг{arrow('vote_average')}
                        </button>
                        <button type="button" onClick={() => onSort('popularity')} style={btnStyle}>
                            Популярність{arrow('popularity')}
                        </button>
                    </div>
                </div>

                {}
                {loading && <div style={stateStyle}>Завантаження даних з TMDB API...</div>}

                {}
                {!loading && error && (
                    <div style={{ ...stateStyle, color: '#fda4af' }}>
                        Помилка запиту: {error}
                    </div>
                )}

                {}
                {!loading && !error && movies.length === 0 && (
                    <div style={stateStyle}>Даних немає — список фільмів порожній.</div>
                )}

                {}
                {!loading && !error && movies.length > 0 && (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                            <tr
                                style={{
                                    borderBottom: '1px solid rgba(168, 85, 247, 0.3)',
                                    color: '#c4b5fd',
                                    fontSize: '13px',
                                }}
                            >
                                <th style={thStyle}>Назва</th>
                                <th style={thStyle}>Дата релізу</th>
                                <th style={thStyle}>Рейтинг</th>
                                <th style={thStyle}>Голосів</th>
                                <th style={thStyle}>Популярність</th>
                            </tr>
                            </thead>
                            <tbody>
                            {movies.map((movie) => (
                                <tr
                                    key={movie.id}
                                    style={{ borderBottom: '1px solid rgba(168, 85, 247, 0.12)' }}
                                >
                                    <td style={{ ...tdStyle, color: '#f3e8ff', fontWeight: 600 }}>
                                        {movie.title}
                                    </td>
                                    <td style={tdStyle}>{movie.release_date || '—'}</td>
                                    <td style={{ ...tdStyle, color: '#f472b6', fontWeight: 700 }}>
                                        ★ {movie.vote_average.toFixed(1)}
                                    </td>
                                    <td style={tdStyle}>{movie.vote_count}</td>
                                    <td style={tdStyle}>{Math.round(movie.popularity)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const boxStyle: React.CSSProperties = {
    background: 'rgba(30, 20, 56, 0.75)',
    border: '1px solid rgba(168, 85, 247, 0.25)',
    borderRadius: '16px',
    padding: '20px',
};

const stateStyle: React.CSSProperties = {
    padding: '28px',
    textAlign: 'center',
    color: '#d8b4fe',
    fontSize: '15px',
};

const btnStyle: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: '8px',
    border: '1px solid rgba(244, 114, 182, 0.45)',
    background: 'rgba(147, 51, 234, 0.25)',
    color: '#f5d0fe',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 600,
};

const thStyle: React.CSSProperties = {
    padding: '10px',
};

const tdStyle: React.CSSProperties = {
    padding: '12px 10px',
    fontSize: '14px',
    color: '#e2d9f3',
};