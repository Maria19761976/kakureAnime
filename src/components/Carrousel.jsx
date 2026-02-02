import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';


const Carrousel = ({ genre = '', studio = '', limit = 0 , items = ""}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);


    const itemsPerPage = Number(items) || 6;
    const maxPages = 3;
    const maxItems = itemsPerPage * maxPages;


    const handleDelete = (id) => {
        setMovies(prev => prev.filter(m => m.id !== id));
    };


    const fetchMoviesData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/movies');


            let data = response.data;


            if (!genre && !studio) {
                data = [...data].sort(() => Math.random() - 0.5);
            }


            if (genre) data = data.filter(movies => movies.genre === genre);
            if (studio) data = data.filter(movies => movies.studio === studio);


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


    const totalPages = Math.ceil(movies.length / itemsPerPage);


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
                    <Link to={genre ? `/movies?genre=${genre}` : studio ? `/movies?studio=${studio}` : '/movies'} className="text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors">
                        Ver más
                    </Link>
                    <div className="flex gap-2">
                        <button onClick={handlePrev} className="rounded-lg border border-amber-200/15 bg-slate-800/50 p-2 text-amber-50 hover:bg-amber-200/10 transition-colors">
                            ❮
                        </button>
                        <button onClick={handleNext} className="rounded-lg border border-amber-200/15 bg-slate-800/50 p-2 text-amber-50 hover:bg-amber-200/10 transition-colors">
                            ❯
                        </button>
                    </div>
                </div>
            </div>
            <div className="relative w-full overflow-hidden rounded-3xl p-4">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {Array.from({ length: totalPages }).map((_, pageIndex) => (
                        <div key={pageIndex} className="min-w-full flex">
                            {movies.slice( pageIndex * itemsPerPage, pageIndex * itemsPerPage + itemsPerPage ).map(movie => (
                                <div key={movie.id} className="w-full px-2 sm:w-1/2 lg:w-1/3">
                                    <MovieCard key={movie.id} movie={movie} showControls={false}/>
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
