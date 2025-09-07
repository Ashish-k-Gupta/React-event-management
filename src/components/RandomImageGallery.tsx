
const seeds = [
    'concert',
    'guitar',
    'musicnight',
    'jazzfest',
    'acoustic',
    'ghazal',
    'sitar',
    'melody',
    'nightshow',
    'rhythm',
    'folk',
    'tabla',
    'liveband',
    'event001',
    'chillbeats',
];

const RandomImageGallery = () => {
    return (
        <div className="bg-gray-900 min-h-screen p-6">
            <h1 className="text-2xl text-white font-bold mb-6 text-center">Random Event Banners</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {seeds.map((seed) => (
                    <div key={seed} className="bg-gray-800 p-4 rounded-lg shadow-md">
                        <img
                            src={`https://picsum.photos/seed/${seed}/400/200`}
                            alt={seed}
                            className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        <p className="text-white text-sm text-center capitalize">{seed}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RandomImageGallery;
