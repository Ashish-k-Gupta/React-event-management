import { useParams } from "@tanstack/react-router";
import { useState } from "react"
import { showSlotDetailsRoute } from "../router";
import { useQuery } from "@tanstack/react-query";
import { getSlotById } from "../service/eventService";
import { Minus, Plus } from "lucide-react";
import { FormatDate } from "../utils/dateUtils";

export function ShowSlotDetails() {
    const {slotId} = useParams({from: showSlotDetailsRoute.id})
    const [ticketCount, setTicketCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const {data, isLoading} = useQuery({
        queryKey: ["slot", slotId],
        queryFn: () => getSlotById(slotId)
    })

    function addTicket()  {
        const newTicketCount = ticketCount + 1;
        setTicketCount(newTicketCount);
        calculateTotal(newTicketCount, data.ticket_price);
    }
    
    function removeTicket(){
        if(ticketCount === 0) return;
        const newTicketCount = ticketCount - 1;
        setTicketCount(newTicketCount);
        calculateTotal(newTicketCount, data.ticket_price)
    }
    
    function calculateTotal (numberOfTicket: number, ticketPrice: number){
        const totalPrice = numberOfTicket * ticketPrice;
        console.log("PRICE:", ticketPrice,"Ticket-Count:", ticketCount);
        return setTotalPrice(totalPrice);
    }
    const eventDateAndTime = new Date(data?.start_date)
    const {date, time} = FormatDate(eventDateAndTime);

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No slot found.</div>;
    return (
    <div className="min-h-screen flex flex-col">
    <div className="header flex flex-col items-center justify-between rounded-md">
            <div className="header-container flex flex-row w-full justify-around shadow-lg">

            <div className="flex flex-col justify-between items-center w-[60%] py-5 border-1">
                    <p className="uppercase text-xl font-semibold ">{data?.event.title || "Slot Details"}</p>
                    <p className="text-gray-500 font-semibold text-md">{`${date} ${time}`}</p>
            </div>
            <div className="cart-count relative text-4xl flex justify-center items-center">🛒
                    <span className="absolute top-5 -right-1 bg-blue-500 w-5 h-5 rounded-full flex items-center justify-center text-lg p-1 text-white">{}</span>
            </div>
            </div>

            
            <div className="content p-4 flex flex-row gap-2 items-center justify-between bg-white border border-gray-200 mt-[5%] w-[30%] rounded-xl shadow-sm">
                <div className="flex flex-col font-semibold justify-center items-start text-[18px]">
                <p>Price</p>
                <p>₹{data.ticket_price}</p>
                </div>

                <div  >{ticketCount === 0 ? (
                        <button className="bg-black rounded-md text-white px-6 py-[7px] text-md font-semibold w-25" onClick={addTicket}>ADD</button>
                ): (
                    <button className="bg-black rounded-md flex items-center justify-around  px-1 gap-2 w-25 py-[5px] text-white text-xl px-1">
                        <Minus color="white" onClick={removeTicket} size={20} ></Minus>
                        {ticketCount}
                        <Plus color="white" onClick={addTicket} size={20}></Plus>
                    </button>
                )
            }</div>
        </div>
        </div>

                    {ticketCount > 0 && (

                            <div className="border border-top-2 border-gray-200 w-full mt-auto font-semibold text-xl flex flex-row items-center justify-center gap-60 py-7">
                            <div className="flex flex-col  justify-start">
                                    <p className="text-xl">₹{totalPrice}</p>
                                    <p className="text-[18px] font-fine text-gray-500">{ticketCount} tickets</p>
                            </div>
                            <button className="border px-2 py-1 bg-black text-white rounded-md text-[18px]">ADD TO CART</button>
                            </div>

                        )
                    }
    </div>

    );
}