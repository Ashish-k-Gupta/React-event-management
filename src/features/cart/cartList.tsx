import { useQuery } from "@tanstack/react-query";
import { getCartDetails } from "../../service/cartService";
import { LoaderCircle } from "lucide-react";
import { CartItem } from "./cartItem";

export function CartList(){
        const { data, isLoading, error } = useQuery({
        queryKey: ["cart"],
        queryFn: getCartDetails
    })

    if (isLoading) return <LoaderCircle />
    if (error) return <div>Error laoding cart</div>;

    const cartItems = data?.message?.userCart?.items || [];
    console.log(data)
  return (
  <>
  <h1>{data?.message?.cartTotal}</h1>
    {cartItems.map((item: any) => (
      <CartItem
        key={item.id}
        name={item.eventSlot.event.title}
        timing={new Date(item.eventSlot.start_date)}
        price={item.price_snapshot}
        quantity={item.quantity}
      />
    ))}
  </>
);
}