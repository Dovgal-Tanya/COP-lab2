import React from 'react';
import { MovieDashboardContainer } from './components/MovieDashboardContainer';
import { MovieStepper } from './components/MovieStepper';
import { ViewToggle } from './components/ViewToggle';
import { FilteredMovieList } from './components/FilteredMovieList';

export const App: React.FC = () => {
    return (
        <div style={{ maxWidth: '1200px', margin: '36px auto', padding: '0 20px' }}>
            <header style={{ marginBottom: '28px', borderBottom: '1px solid rgba(168, 85, 247, 0.25)', paddingBottom: '16px' }}>
                <h1 style={{ margin: '0 0 6px 0', color: '#f3e8ff', fontSize: '26px', fontWeight: 700 }}>
                    Кіно-Аналітика <span style={{ color: '#f472b6' }}>Dashboard</span>
                </h1>
            </header>

            <MovieDashboardContainer />

            <section style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '24px' }}>
                <MovieStepper />
                <ViewToggle />
            </section>

            <section style={{ marginTop: '24px' }}>
                <FilteredMovieList />
            </section>
        </div>
    );
};

export default App;