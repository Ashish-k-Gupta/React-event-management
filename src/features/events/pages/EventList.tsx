import { getEvents } from "../../../service/eventService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { eventDetailRoute } from "../../../router";

function EventList() {
    const { isPending, error, data } = useQuery({
        queryKey: ['eventList'],
        queryFn: getEvents,
    });

    if (isPending) return <p>Loading...</p>;
    if (error instanceof Error) return <p>{error.message} </p>;

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <h1 className="text-3xl font-bold text-center text-orange-500 mb-8">
                Upcoming Events
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pl-8 pr-8">
                {data?.map((event) => (
                    <Link
                        to={eventDetailRoute.to}
                        key={event.id}
                        params={{ eventId: event.id.toString() }}
                        className="bg-gray-800 min-h-[500px] rounded-2xl shadow-lg p-6 hover:scale-105 hover:shadow-xl transition-transform duration-300"
                    >
                        <img
                            src="https://picsum.photos/seed/art/600/300" // Replace with your image URL
                            alt={event.title}
                            className="w-full h-60 object-cover rounded-lg mb-4"
                        />
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-white mb-2">{event.title}</h2>
                            <p className="text-gray-400 text-sm mb-2">
                                Language: {event.language}
                            </p>
                            <p className="text-gray-300 text-sm mb-2">
                                Date: {new Date(event.startDate).toLocaleDateString()} to {new Date(event.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                Hosted by: {event.user.firstName}
                            </p>
                        </div>
                    </Link>

                ))}
            </div>
        </div>
    );


}

export default EventList;



{/* <a
    href={`/events/${event.id}`}
    className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
>
    View Details
</a> */}