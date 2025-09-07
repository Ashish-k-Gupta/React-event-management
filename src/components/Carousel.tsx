import { useEffect, useState } from "react";

export default function Carousel() {
    const images = [
        {
            src: 'https://placehold.co/2000x400/2a9d8f/ffffff?text=Hello,World',
            alt: 'Placeholder for slide 1'
        },
        {
            src: 'https://placehold.co/2000x400/e9c46a/000000?text=Slide+2',
            alt: 'Placeholder for slide 2'
        },
        {
            src: 'https://placehold.co/2000x400/f4a261/000000?text=Slide+3',
            alt: 'Placeholder for slide 3'
        },
        {
            src: 'https://placehold.co/2000x400/e76f51/ffffff?text=Slide+4',
            alt: 'Placeholder for slide 4'
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide(currentSlide => (currentSlide + 1) % images.length);
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide => (currentSlide - 1 + images.length) % images.length);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 4000);
        return () => clearInterval(interval)
    })

    return (
        <div className="min-h-screen bg-gray-900 flex item-center justify-center p-0 font-sans text-white">
            <div className="w-full mamx-w-4xl absolute overflow-hidden shadwon-lg bg-gray-800">
                <div className="realtive h-64 sm:h-96">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.src}
                            alt={image.alt}
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out
                            ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        />

                    ))}
                </div>
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                {/* Next Button */}
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentSlide ? 'bg-white' : 'bg-gray-400'
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
        </div >
    )
}