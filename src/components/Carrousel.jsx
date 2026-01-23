import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Carrousel = ({ genre = '', studio = '', limit = 0 }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

const fetchMoviesData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/movies');

            let data = response.data;
            if (genre) data = data.filter(m => m.genre === genre);
            if (studio) data = data.filter(m => m.studio === studio);
            if (limit > 0) data = data.slice(0, limit);
            setMovies(data);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching movies:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMoviesData();
    }, [genre, studio, limit]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === movies.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? movies.length - 1 : prevIndex - 1
        );
    };

    if (loading) return <p className="text-white text-center">Loading...</p>;
    if (movies.length === 0) return <p className="text-white">No movies found.</p>;

    return (
        <div className="relative w-full overflow-hidden p-4">
            <h2 className="text-xl font-bold text-white mb-4">
                {studio ? `Studio: ${studio}` : genre ? `Genre: ${genre}` : 'Movies'}
            </h2>

            <div className="flex items-center">
                <button 
                    onClick={handlePrev} 
                    className="absolute left-0 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/80"
                >
                </button>

                <div className="w-full overflow-hidden">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {movies.map((movie) => (
                            <div key={movie.id} className="min-w-full p-2 text-white text-center">
                                <img 
                                    src={movie.poster} 
                                    alt={movie.title} 
                                    className="w-full h-64 object-cover rounded-lg"
                                />
                                <h3 className="mt-2 text-lg font-semibold">{movie.title}</h3>
                                <p className="text-sm text-gray-400">{movie.studio} - {movie.genre}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={handleNext} className="absolute right-0 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/80">
                </button>
            </div>
        </div>
    );
};

export default Carrousel;