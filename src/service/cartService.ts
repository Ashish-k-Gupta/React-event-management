import { apiFetch } from "./api"

export const addToCartApi = async (payload: { eventSlotId: string, numberOfTickets: number }) => {
    return apiFetch('/cart/items', {
        method: 'POST',
        body: JSON.stringify(payload)
    })
}

export const getCartDetails = async () => {
    return apiFetch('/cart');
}