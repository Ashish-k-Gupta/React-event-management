import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCartApi, getCartDetails } from "../service/cartService";
import { useNavigate } from "@tanstack/react-router";

export function useAddToCart() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: addToCartApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            navigate({ to: "/cart" });
        },
        onError: (error) => {
            alert(error.message)
        }
    })
}


export function useCart() {
    return useQuery({
        queryKey: ["cart"],
        queryFn: getCartDetails,

        select: (data) => ({
            items: data.message.userCart.items,
            totalQuantity: data.message.userCart.items.reduce((acc: number, item: any) => acc + item.quantity, 0),
            cartTotal: data.message.cartTotal
        })
    })
}