import { IndianRupee, Minus, Plus, Trash2 } from "lucide-react";
import { FormatDate } from "../../utils/dateUtils";

interface CartItemProps  {
    name: string, 
    timing: Date,
    quantity: number,
    price: number,
}


export function CartItem({name, timing, quantity, price}: CartItemProps) {

    const { date, time } = FormatDate(timing);


    function deleteItem() { }
    return (
        <div className="bg-white text-black w-150 flex flex-row justify-between px-5 items-center h-30 border-gray-300 border-1 rounded-xl">

            <div className="flex items-center gap-4">
                <img src="src\assets\techEvent.png" height={100} width={70} alt="" className="rounded-md"/>
                <div className="flex flex-col h-20 justify-between w-75 wrap border-green-900 leading-none">
                    <div className="flex flex-col justify-between h-9">
                    <p className="font-semibold">{name}</p>
                    <p className="text-md font-fine">{date} <span>{time}</span></p>
                    </div>


                    <div>
                    <Trash2 strokeWidth={1.25} color="black" size={21} onClick={deleteItem} className="cursor-pointer"/>
                    </div>

                </div>

            </div>


            <div className="flex flex-col items-center justify-start">
                <div className="w-22 flex flex-row justify-center items-center mb-1">
                    <span><IndianRupee size={15}/></span>
                    <p className="text-xl font-bold text-gray-700">{price}</p>
                </div>

                 <div className="text-[18px] px-1 flex flex-row justify-between items-center rounded-md min-w-22 border-gray-300 border-1 mt-1">
                        <Minus strokeWidth={1.50} size={17} className="cursor-pointer"/>
                        <p>{quantity}</p>
                        <Plus strokeWidth={1.50} size={17} className="cursor-pointer"/>
                    </div>
               
            </div>
        </div>
    )
}



