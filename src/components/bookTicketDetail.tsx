import { useNavigate, useParams } from "@tanstack/react-router";
import { bookTicketRoute, showSlotDetailsRoute } from "../router";
import { useQuery } from "@tanstack/react-query";
import { getSlotsByEventId } from "../service/eventService";


export function BookTicketDetail() {


    const { eventId } = useParams({ from: bookTicketRoute.id });
    const navigate = useNavigate();
    const handleSlotTicket = (slotId: string) => {
        navigate({ 
            to: showSlotDetailsRoute.to,
            params: {  eventId, slotId },
        })

    }


    const { data: res, isPending } = useQuery({
        queryKey: ["eventSlots", eventId],
        queryFn: () => getSlotsByEventId(Number(eventId)),
        enabled: !!eventId
    })

    if (isPending) return <p>Loading...</p>;


    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const month = date.toLocaleString("default", { month: "short" }).toUpperCase();
        const day = date.getDate().toString().padStart(2, "0");
        const weekday = date.toLocaleString("default", { weekday: 'short' })
        return { month, day, weekday }
    }

    const formatTime = (start: string, end: string) => {
        const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: true };
        const startTime = new Date(start).toLocaleTimeString([], options);
        const endTime = new Date(end).toLocaleTimeString([], options);
        return `${startTime} to ${endTime}`;
    };


    return (
        <>
            <div className="font-bold text-xl flex items-center justify-center py-10">
                <h3>SELECT DATE & TIME</h3>
            </div>
            <div className="bg-[#F9F9FA] flex flex-col pt-[1%] items-center h-screen" >

                {res?.slots?.map((slot: any) => {

                    const { month, day } = formatDate(slot.start_date);
                    const timeRange = formatTime(slot.start_date, slot.end_date);
                    return (
                        <div className="flex flex-row items-center justify-between w-3/9 border border-gray-300 rounded-xl my-3" key={slot.id}>

                            <div className="flex flex-row items-center">

                                <div className="flex flex-col w-fit py-0 pl-5 mr-3 items-center justify-center rounded-xl leading-tight">
                                    <span className="font-medium">{day}</span>
                                    <span className="font-semibold">{month}</span>
                                </div>
                                <div className="border-1 border-gray-500 h-9"></div>
                                <div className="font-semibold flex flex-col m-3">
                                    <span>{timeRange}</span>
                                </div>
                            </div>
                            <div className="font-semibold bg-gray-200 p-5 pt-1 pb-1 rounded-md flex flex-col items-center justify-center w-fit m-5">
                                <button onClick={() =>handleSlotTicket(slot.id)}>BOOK</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}