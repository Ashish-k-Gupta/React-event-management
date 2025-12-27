import { Link,  useParams } from "@tanstack/react-router";
import { useState } from "react"
import { showSlotDetailsRoute } from "../router";
import { getSlotById } from "../service/eventService";
import { Loader2, Minus, Plus } from "lucide-react";
import { FormatDate } from "../utils/dateUtils";
import { useAddToCart, useCart } from "../hooks/useCart";
import { useQuery } from "@tanstack/react-query";

export function ShowSlotDetails() {
    const { slotId } = useParams({ from: showSlotDetailsRoute.id })
    const [ticketCount, setTicketCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const { data: cartData } = useCart();

    const {mutate, isPending} = useAddToCart()
    const handleAddToCart = () => {
        mutate({
            eventSlotId: slotId,
            numberOfTickets: ticketCount,
        })
        
    }

    const { data, isLoading } = useQuery({
        queryKey: ["slot", slotId],
        queryFn: () => getSlotById(slotId)
    })

    function addTicket() {
        const newTicketCount = ticketCount + 1;
        setTicketCount(newTicketCount);
        calculateTotal(newTicketCount, data.ticket_price);
    }

    function removeTicket() {
        if (ticketCount === 0) return;
        const newTicketCount = ticketCount - 1;
        setTicketCount(newTicketCount);
        calculateTotal(newTicketCount, data.ticket_price)
    }

    function calculateTotal(numberOfTicket: number, ticketPrice: number) {
        const totalPrice = numberOfTicket * ticketPrice;
        console.log("PRICE:", ticketPrice, "Ticket-Count:", ticketCount);
        return setTotalPrice(totalPrice);
    }
    const eventDateAndTime = new Date(data?.start_date)
    const { date, time } = FormatDate(eventDateAndTime);

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No slot found.</div>;
    return (
        <div className="relative h-full flex flex-col justify-between">
            <div className="header flex flex-col items-center justify-between rounded-md ">
                <div className="header-container flex items-center w-full shadow-lg px-6 h-20 border-1">

                    <div className="flex-1" />

                    <div className="flex flex-col items-center text-center">
                        <p className="uppercase text-xl font-semibold">
                            {data?.event.title || "Slot Details"}
                        </p>
                        <p className="text-gray-500 font-semibold text-md">
                            {`${date} ${time}`}
                        </p>
                    </div>

                    <div className="flex-1 flex justify-end pr-6">
                        <div 
                        className="cart-count relative text-3xl flex items-center cursor-pointer">
                            <Link to="/cart">
                            🛒
                            <span className="absolute -top-1 -right-2 bg-black w-5 h-5 p-1 rounded-full flex items-center justify-center text-base text-white font-semibold">
                                {cartData?.totalQuantity || 0}
                            </span>
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="content p-4 flex flex-row gap-2 items-center justify-between bg-white border border-gray-200 w-[30%] rounded-xl shadow-sm mt-25">

                    <div className="flex flex-col font-semibold justify-center items-start text-[18px]">
                        <p>Price</p>
                        <p>₹{data.ticket_price}</p>
                    </div>

                    <div  >{ticketCount === 0 ? (
                        <button className="bg-black rounded-md text-white px-6 py-[7px] text-md font-semibold w-25 cursor-pointer" onClick={addTicket}>ADD</button>
                    ) : (
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

                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200">
                    <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4 font-semibold">
                        <div>
                            <p className="text-xl">₹{totalPrice}</p>
                            <p className="text-sm text-gray-500">{ticketCount} tickets</p>
                        </div>

                        <button className="bg-black text-white px-4 py-2 rounded-md cursor-pointer"
                        onClick={handleAddToCart}
                        disabled={isPending}>
                            {isPending ? (
                                <>
                                <Loader2 className="animate-spin" size={18}/>
                                </>
                            ):
                            "ADD TO CART"
                            }
                        </button>
                    </div>
                </div>
            )
            }
        </div>

    );
}