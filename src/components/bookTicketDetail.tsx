export function BookTicketDetail({ }) {

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const month = date.toLocaleString("default", { month: "short" }).toUpperCase();
        const day = date.getDate().toString().padStart(2, "0");
        const weekday = date.toLocaleString("default", { weekday: 'short' })
        return { month, day, weekday }
    }

    const formatTime = (start: string, end: string) => {
        const options = { hour: "numeric", minutes: "2-digit" };
        const startTime = new Date(start).toLocaleTimeString([], options);
        const endTime = new Date(end).toLocaleTimeString([], options)
        return `${startTime} - ${endTime}`;
    }

    return (
        <>
            <div className="font-bold text-xl flex item-center justify-center">
                <h3>SELECT DATE & TIME</h3>
            </div>
            <div className="bg-[#F9F9FA] flex flex-col justify-center items-center" >

                {/* Available Dates */}

                {
                    <div className="flex flex-row items-center justify-between w-1/5 border border-gray-300 rounded-xl">

                        <div className="flex flex-row">

                            <div className="flex flex-col w-fit p-1 px-2 items-center justify-center rounded-xl leading-tight">
                                <span className="font-medium">03</span>
                                <span className="font-semibold">Nov</span>
                            </div>
                            <div className="border-1 mt-2 border-gray-300 h-13 flex items-center justify-center"></div>
                            <div className="font-semibold flex flex-col m-5">
                                <span>07 AM to 09 AM</span>
                            </div>
                        </div>

                        <div className="font-semibold bg-gray-200 p-5 pt-1 pb-1 rounded-md flex flex-col items-center justify-center w-fit m-5">
                            <button>Book</button>
                        </div>
                    </div>
                }
            </div >
        </>
    )
}