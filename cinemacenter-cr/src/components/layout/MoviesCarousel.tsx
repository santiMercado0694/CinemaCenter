import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const MoviesCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      img: '/MoviesCarousel/DeadPoolWolverine.jpg',
      alt: 'DeadPool Wolverine',
    },
    {
      img: '/MoviesCarousel/Intensamente2.jpg',
      alt: 'Intensamente 2',
    },
    {
      img: '/MoviesCarousel/MiVillanoFavorito4.jpg',
      alt: 'Mi Villano Favorito 4',
    },
    {
      img: '/MoviesCarousel/Twister.jpg',
      alt: 'Twister',
    },
    {
      img: '/MoviesCarousel/UnLugarEnSilencioDiaUno.jpg',
      alt: 'Un Lugar En Silencio Día Uno',
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Automatically move to the next slide every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000); // Change this value to adjust the interval

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div id="carouselExampleIndicators" className="-mt-8 relative overflow-hidden">
      {/* Indicator dots */}
      <div className="absolute bottom-1 left-0 right-0 flex justify-center p-4 space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide images */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex-shrink-0 w-full h-[450px] relative">
              <Image
                src={slide.img}
                alt={slide.alt}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesCarousel;
