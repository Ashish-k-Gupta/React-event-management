import { useParams } from "@tanstack/react-router";
import { useState } from "react"
import { showSlotDetailsRoute } from "../router";
import { useQuery } from "@tanstack/react-query";
import { getSlotById } from "../service/eventService";

export function ShowSlotDetails() {
    const {slotId} = useParams({from: showSlotDetailsRoute.id})

    const {data, isLoading} = useQuery({
        queryKey: ["slot", slotId],
        queryFn: () => getSlotById(slotId)
    })
    const [ticketCount, setTicketCount] = useState(0);

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No slot found.</div>;
// I have to write date format function which convert the time that I'm receiving from the backend to norma user readable time and then I have to add a state at application level to track cart. then we have to also track the tickets on the this component level then also the price of ticket while the user is on this page.
    return (
        <>
            <div className="header border flex flex-col items-center justify-center h-25">
                <p className="uppercase text-xl font-semibold ">{data?.event.title || "Slot Details"}</p>
            </div>

            <div className="content p-4 flex flex-col gap-2">
                <p>Date: {data.start_date}</p>
                <p>Time: {data.start_time}</p>
                <p>Price: ₹{data.price}</p>

                <div className="flex items-center gap-3 mt-4">
                    <button 
                        onClick={() => setTicketCount(ticketCount - 1)}
                        disabled={ticketCount <= 1}
                    >
                        -
                    </button>

                    <span>{ticketCount}</span>

                    <button 
                        onClick={() => setTicketCount(ticketCount + 1)}
                    >
                        +
                    </button>
                </div>

                <button className="border px-4 py-2 mt-5">
                    Continue to Payment
                </button>
            </div>
        </>
    );
}