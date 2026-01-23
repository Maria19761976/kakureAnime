import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Carrousel = ({ type = 'popular', currentGenre = '' }) => {
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Determines how many items to show based on screen width
    // In a real project, you could use a custom hook for window size
    const itemsToShow = {
        mobile: 1,
        tablet: 3,
        desktop: 4
    };

    const fetchMoviesData = async () => {
        try {
            // Updated to port 3001 as per your requirement
            const response = await axios.get('http://localhost:3001/movies');
            let data = response.data;

            if (type === 'related' && currentGenre) {
                data = data.filter(m => m.genre === currentGenre);
            }
            
            setMovies(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMoviesData();
    }, [type, currentGenre]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            // Prevents sliding past the end
            const lastIndex = movies.length - 1;
            return prevIndex === lastIndex ? 0 : prevIndex + 1;
        });
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            const lastIndex = movies.length - 1;
            return prevIndex === 0 ? lastIndex : prevIndex - 1;
        });
    };

    if (loading) {
        return <div className="text-center p-10 text-amber-200/50">Cargando catálogo...</div>;
    }

    if (movies.length === 0) {
        return <div className="text-center p-10 text-slate-400">No se encontraron películas similares.</div>;
    }

    return (
        <section className="w-full space-y-4">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-semibold text-amber-50">
                    {type === 'popular' ? '✨ Destacados para ti' : '🎬 Más contenido similar'}
                </h2>
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

            {/* Carousel Window */}
            <div className="relative w-full overflow-hidden rounded-3xl border border-amber-200/10 bg-slate-900/20 p-4">
                <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ 
                        // Logic: Move by (100% / items_visible) * currentIndex
                        // Simplified for 1 item per view for clarity, but responsive in CSS
                        transform: `translateX(-${currentIndex * 100}%)` 
                    }}
                >
                    {movies.map((movie) => (
                        <div 
                            key={movie.id} 
                            className="min-w-full flex-shrink-0 px-2 sm:min-w-[50%] lg:min-w-[33.333%]"
                        >
                            <div className="group relative overflow-hidden rounded-2xl border border-amber-200/10 bg-slate-800/40 transition-all hover:border-amber-200/30">
                                <img 
                                    src={movie.poster} 
                                    alt={movie.title} 
                                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                                <div className="absolute bottom-0 p-4 w-full">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300/80">
                                        {movie.genre}
                                    </span>
                                    <h3 className="mt-1 text-base font-semibold text-amber-50 truncate">
                                        {movie.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 pt-2">
                {movies.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1 rounded-full transition-all ${
                            currentIndex === index ? 'w-6 bg-amber-300/70' : 'w-2 bg-slate-700'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Carrousel;