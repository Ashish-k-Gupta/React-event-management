import type { ticketCardProps } from "../types/ticketCard";
import { Calendar, IndianRupee, MapPin, Tag } from "lucide-react";


export function TicketCard({ eventTitle, categories, startDateTime, endDateTime, venue, ticketPrice, onButtonClick }: ticketCardProps) {
    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleString("en-IN", {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    }
    return (
        <div className="w-full min-w-md bg-white shadow-md rounded-2xl p-5 border border-gray-300 hover:shadow-lg transition-all duration-200">
            <h1 className="text-xl font-bold text-gray-900 mb-4">{eventTitle}</h1>

            <div className="text-[17px] font-semibold">

                <div className="flex items-center mb-4">
                    <Tag size={22} strokeWidth={1.5} className="text-black mr-2" />
                    <p className="text-md">{categories}</p>
                </div>

                <div className="flex items-center mb-4">
                    <Calendar size={22} strokeWidth={1.5} className="text-black mr-2" />
                    <p className="text-md">
                        {formatDate(startDateTime)} <span className="text-gray-400">to</span>{" "}
                        {formatDate(endDateTime)}
                    </p>
                </div>

                <div className="flex items-center mb-4">
                    <MapPin size={22} strokeWidth={1.5} className="text-black mr-2" />
                    <p className="text-md">{venue}</p>
                </div>
            </div>

            <div className="mt-7 pt-3 border-t border-gray-300 flex flex-row justify-between items-center w-full px-1">
                <div className="flex flex-col">
                    <p className="text-gray-500 font-normal text-[12px]">Start From</p>
                    <div className="flex flex-row mt-[-5px]">
                        <IndianRupee size={15} className="text-black-1000 mt-1" />
                        <p className="text-[17px] font-semibold">{ticketPrice}</p>
                    </div>
                </div>
                <div>
                    <button onClick={onButtonClick}
                        className="bg-black text-white font-semibold px-4 py-2 rounded hover:bg-gray-800 transition"
                    >BOOK TICKETS</button>
                </div>
            </div>

        </div>
    );
}