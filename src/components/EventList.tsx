import { getEvents } from "../service/eventService";
import { useQuery } from "@tanstack/react-query";
import EventDetail from "./EventDetail";

function EventList() {
    const { isPending, error, data } = useQuery({
        queryKey: ['eventList'],
        queryFn: getEvents,
    });

    if (isPending) return <p>Loading...</p>;
    if (error instanceof Error) return <p>{error.message} </p>;
    console.log(data);

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">
                Upcoming Events
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.map((event) => (
                    <div
                        key={event.id}
                        className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition-transform duration-300"
                    >
                        <h2 className="text-xl font-semibold text-white mb-2">{event.title}</h2>
                        <p className="text-gray-400 text-sm mb-2">
                            Language: {event.language}
                        </p>
                        <p className="text-gray-300 text-sm mb-2">
                            Date: {new Date(event.startDate).toLocaleDateString()} to {new Date(event.endDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                            {/* The Event interface doesn't have a 'description' property,
                            so this line needs to be removed or replaced.
                            We'll display the user's first name as an example.
                        */}
                            Hosted by: {event.user.firstName}
                        </p>
                        <a
                            href={`/events/${event.id}`}
                            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                            View Details
                        </a>
                        <button
                            onClick={() => EventDetail()}
                            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventList;