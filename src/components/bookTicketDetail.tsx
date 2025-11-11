import { useParams } from "@tanstack/react-router";
import { bookTicketRoute } from "../router";
import { useQuery } from "@tanstack/react-query";
import { getSlotsByEventId } from "../service/eventService";


export function BookTicketDetail() {

    const { eventId } = useParams({ from: bookTicketRoute.id });





    const { data: slots, isPending } = useQuery({
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

                {/* Available Dates */}

                {slots?.map((slot: any) => {

                    const { month, day } = formatDate(slot.start_date);
                    const timeRange = formatTime(slot.start_date, slot.end_date);


                    return (
                        <div className="flex flex-row items-center justify-between w-2/8 border border-gray-300 rounded-xl my-3" key={slot.id}>

                            <div className="flex flex-row">

                                <div className="flex flex-col w-fit py-0 px-5 items-center justify-center rounded-xl leading-tight">
                                    <span className="font-medium">{day}</span>
                                    <span className="font-semibold">{month}</span>
                                </div>
                                <div className="border-1 mt-1 border-gray-300 h-14 flex items-center justify-center"></div>
                                <div className="font-semibold flex flex-col m-5">
                                    <span>{timeRange}</span>
                                </div>
                            </div>
                            <div className="font-semibold bg-gray-200 p-5 pt-1 pb-1 rounded-md flex flex-col items-center justify-center w-fit m-5">
                                <button>BOOK</button>
                            </div>
                        </div>

                    );
                })}
            </div>
        </>
    );
}