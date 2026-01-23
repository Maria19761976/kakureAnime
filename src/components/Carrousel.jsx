import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Carrousel = ({ genre = '', studio = '', limit = 0 }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getItemsInView = () => {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 640) return 2;
        return 1;
        };

    const fetchMoviesData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/movies');

            let data = response.data;

            if (!genre && !studio) {
                data = [...data].sort(() => Math.random() - 0.5);
            }

            if (genre) data = data.filter(m => m.genre === genre);
            if (studio) data = data.filter(m => m.studio === studio);

            const itemsInView = getItemsInView();
            const maxPages = 3;
            const maxItems = itemsInView * maxPages;

            data = data.slice(0, maxItems);

            if (limit > 0) data = data.slice(0, limit);

            setMovies(data);
            setCurrentIndex(0);
            setLoading(false);
        } 
        catch (error) {
            console.error('Error fetching movies:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
    fetchMoviesData();
    }, [genre, studio, limit]);

    const itemsInView = getItemsInView();
    const totalPages = Math.ceil(movies.length / itemsInView);

    const handleNext = () => {
        setCurrentIndex(prev =>
        prev >= totalPages - 1 ? 0 : prev + 1
    );
    };

    const handlePrev = () => {
        setCurrentIndex(prev =>
        prev === 0 ? totalPages - 1 : prev - 1
        );
    };

    if (loading) return <p className="text-white text-center">Loading...</p>;
    if (movies.length === 0) return <p className="text-white">No movies found.</p>;

    return (
        <section className="w-full space-y-4">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-semibold text-amber-50">
                {studio ? `Colección ${studio}` : genre ? `Género: ${genre}` : 'Recomendados'}
                </h2>

                <div className="flex items-center gap-3">
                    <Link
                        to={
                        genre
                            ? `/movies?genre=${genre}`
                            : studio
                            ? `/movies?studio=${studio}`
                            : '/movies'
                        }
                        className="text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors">
                        Ver más
                    </Link>

                    <div className="flex gap-2">
                        <button
                            onClick={handlePrev}
                            className="rounded-lg border border-amber-200/15 bg-slate-800/50 p-2 text-amber-50 hover:bg-amber-200/10 transition-colors"
                        >
                            ❮
                        </button>
                        <button
                            onClick={handleNext}
                            className="rounded-lg border border-amber-200/15 bg-slate-800/50 p-2 text-amber-50 hover:bg-amber-200/10 transition-colors"
                        >
                            ❯
                        </button>
                    </div>
                </div>
            </div>

            <div className="relative w-full overflow-hidden rounded-3xl p-4">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {Array.from({ length: totalPages }).map((_, pageIndex) => (
                        <div key={pageIndex} className="min-w-full flex">
                            {movies.slice(
                                pageIndex * itemsInView,
                                pageIndex * itemsInView + itemsInView
                                )
                            .map(movie => (
                                <div key={movie.id} className="w-full px-2 sm:w-1/2 lg:w-1/3">
                                    <div className="group relative overflow-hidden rounded-2xl border border-amber-200/10 bg-slate-800/40 transition-all hover:border-amber-200/30">
                                        <img
                                            src={movie.poster}
                                            alt={movie.title}
                                            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-80"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                                        <div className="absolute bottom-0 w-full p-4">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300/80">
                                            {movie.genre}
                                            </span>
                                            <h3 className="mt-1 truncate text-base font-semibold text-amber-50">
                                                {movie.title}
                                            </h3>
                                            <p className="text-xs text-slate-400">
                                                {movie.studio}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1 rounded-full transition-all ${
                            currentIndex === index
                            ? 'w-6 bg-amber-300/70'
                            : 'w-2 bg-slate-700'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Carrousel;
