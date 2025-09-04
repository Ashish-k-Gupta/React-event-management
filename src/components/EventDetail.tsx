import { useQuery } from "@tanstack/react-query";
import { getEventById } from "../service/eventService";
import { useParams } from "@tanstack/react-router";
import { eventDetailRoute } from "../router";
import { Calendar, Tag, User, Ticket, Languages } from "lucide-react";

function EventDetail() {
    const { eventId } = useParams({ from: eventDetailRoute.id });

    const { isPending, error, data: event } = useQuery({
        queryKey: ["eventDetail", eventId],
        queryFn: () => getEventById(parseInt(eventId)),
        enabled: !!eventId,
    });

    if (isPending) return <p className="text-center text-gray-500">Loading...</p>;
    if (error instanceof Error) return <p className="text-red-500">{error.message}</p>;

    const start = new Date(event.startDate).toLocaleString();
    const end = new Date(event.endDate).toLocaleString();
    const bookedSeats = event.totalSeats - event.availableSeats;
    const seatPercentage = Math.round((bookedSeats / event.totalSeats) * 100);

    const handleBookTicket = () => {
        if (event.availableSeats <= 0 || event.isCancelled) {
            alert("Sorry, booking is not available.");
            return;
        }
        alert(`Ticket booked for "${event.title}" 🎉`);
    };

    return (
        <div className="p-8 max-w-3xl mx-auto bg-gradient-to-br from-orange-50 to-blue-50 shadow-xl rounded-2xl space-y-6">
            {/* Title & Status */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-extrabold text-gray-900">{event.title}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                    {event.categories.map((cat: string) => (
                        <span
                            key={cat}
                            className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full flex items-center gap-1"
                        >
                            <Tag size={14} /> {cat}
                        </span>
                    ))}
                    {event.isCancelled && (
                        <span className="px-3 py-1 text-sm font-medium bg-red-100 text-red-600 rounded-full">
                            Cancelled
                        </span>
                    )}
                </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed">{event.description}</p>

            {/* Details Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center gap-3">
                    <Languages className="text-blue-500" />
                    <span className="text-gray-700">Language: {event.language}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Ticket className="text-green-500" />
                    <span className="text-gray-700 font-semibold">₹{event.ticketPrice}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar className="text-orange-500" />
                    <span className="text-gray-700">Start: {start}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Calendar className="text-purple-500" />
                    <span className="text-gray-700">End: {end}</span>
                </div>
            </div>

            {/* Seats Availability */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-between mb-2">
                    <span className="text-gray-700 font-medium">Seats Booked</span>
                    <span className="text-gray-500 text-sm">
                        {bookedSeats}/{event.totalSeats}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-blue-500 h-3 rounded-full transition-all"
                        style={{ width: `${seatPercentage}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">{event.availableSeats} seats left</p>
            </div>

            {/* Host */}
            {event.user && (
                <div className="flex items-center gap-3 bg-white p-6 rounded-xl shadow-md">
                    <User className="text-gray-600" />
                    <span className="text-gray-700">
                        Hosted by <strong>{event.user.firstName}</strong>
                    </span>
                </div>
            )}

            {/* Book Ticket Button */}
            <div className="text-center">
                <button
                    onClick={handleBookTicket}
                    disabled={event.isCancelled || event.availableSeats <= 0}
                    className={`px-6 py-3 text-lg font-semibold rounded-xl shadow-md transition 
            ${event.isCancelled || event.availableSeats <= 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                >
                    {event.isCancelled
                        ? "Event Cancelled"
                        : event.availableSeats <= 0
                            ? "Sold Out"
                            : "Book Ticket"}
                </button>
            </div>
        </div>
    );
}

export default EventDetail;
