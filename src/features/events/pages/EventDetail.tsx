import { useQuery } from "@tanstack/react-query";
import { getEventById } from "../../../service/eventService";
import { useNavigate, useParams } from "@tanstack/react-router";
import { eventDetailRoute } from "../../../router";
import { Tag, User, Languages, MapPinned } from "lucide-react";
import { TicketCard } from "../../../cards/TicketCard";

function EventDetail() {
    const { eventId } = useParams({ from: eventDetailRoute.id });
    const navigate = useNavigate();

    const handleBookTicket = () => {
        navigate({ to: `/events/${eventId}/buy-page` })
    }
    const { isPending, error, data: event } = useQuery({
        queryKey: ["eventDetail", eventId],
        queryFn: () => getEventById(parseInt(eventId)),
        enabled: !!eventId,
    });


    if (isPending) return <p className="text-center text-gray-500">Loading...</p>;
    if (error instanceof Error) return <p className="text-red-500">{error.message}</p>;

    return (
        <div className="p-8 max-w-7xl mx-auto bg-white shadow-xl rounded-2xl space-y-6">
            {/* Title & Status */}
            <h1 className="text-3xl font-extrabold text-gray-900">{event.title}</h1>
            <div className="flex flex-row gap-2 justify-between">
                <img
                    src="https://picsum.photos/seed/art/600/300" // Replace with your image URL
                    alt={event.title}
                    className="w-full md:w-4/5 lg:w-5/8 h-120 object-cover rounded-lg mb-4"
                />
                <div className="max-w-2xl flex flex-col">
                    <TicketCard onButtonClick={handleBookTicket} eventTitle={event.title} categories={event.categories} startDateTime={event.slots[0].start_date} endDateTime={event.slots[0].end_date} venue="Patiala" ticketPrice={event.slots[0].ticket_price} />

                </div>

            </div>

            <div className="flex flex-col items-start gap-2">
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
            {/* Description */}
            <h4 className="font-bold text-2xl mb-2">About the Event</h4>
            <p className="text-lg text-gray-700 leading-relaxed w-full md:w-4/5 lg:w-5/8">{event.description}</p>

            {/* Details Section */}
            <h5 className="font-semibold text-xl mb-3">Event Guide</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white p-6 pl-0 pt-0 rounded-xl shadow-md]">
                <div className="flex items-center gap-3 w-auto justify-start w-fit pl-0 pr-5 pt-2 pb-2">
                    <div className="bg-gray-100 p-3 rounded-md">
                        <Languages className="text-gray-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-500 text-sm">Language</span>
                        <span className="text-gray-700 font-semibold">{event.language}</span>
                    </div>
                </div>
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


            <div className="w-full md:w-4/5 lg:w-5/8 object-cover rounded-lg mb-4">

                <h2 className="text-2xl font-semibold mb-3">Venue</h2>
                <div className="p-3 flex flex-row justify-between border border-gray-200 rounded-lg">
                    <div className="p-3">
                        <p className="text-[18px] font-medium">{event.venue}</p>
                    </div>

                    <div className="p-3 border border-gray-200 rounded-lg flex flex-row lg:w-1/4 justify-around font-semibold">
                        <MapPinned className="text-gray-600" />
                        <button>Get Direction</button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default EventDetail;
