import { useParams } from "@tanstack/react-router";
import { useState } from "react"
import { showSlotDetailsRoute } from "../router";
import { useQuery } from "@tanstack/react-query";
import { getSlotById } from "../service/eventService";
import {  Minus, Plus } from "lucide-react";

export function ShowSlotDetails() {
    const {slotId} = useParams({from: showSlotDetailsRoute.id})
    const [ticketCount, setTicketCount] = useState(0);
    const {data, isLoading} = useQuery({
        queryKey: ["slot", slotId],
        queryFn: () => getSlotById(slotId)
    })
    console.log(data);

    function addTicket()  {
        setTicketCount(prev => prev + 1)
    }

    function removeTicket(){
        setTicketCount(prev => Math.max(0, prev - 1));
    }

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
                <p>Price: ₹{data.ticket_price}</p>
                <div>

                <button>{ticketCount === 0 ? (
                    <span onClick={addTicket}>ADD</span>
                ): (
                    <div className="bg-black rounded-md flex items-center justify-around w-20">
                        <Minus color="white" onClick={removeTicket} size={20} ></Minus>
                        <span className="text-white text-xl">{ticketCount}</span>
                        <Plus color="white" onClick={addTicket}></Plus>
                    </div>
                )
            }</button>
            </div>

                <button className="border px-4 py-2 mt-5">
                    Continue to Payment
                </button>
            </div>
        </>
    );
}