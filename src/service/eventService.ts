import { apiFetch } from "./api";
import type { Event } from "../types/event";



export const getEvents = async (): Promise<Event[]> => {
    try {
        const res = await apiFetch("/events/quick-list", { method: 'GET' });
        console.log(res);
        return res;
    } catch (error) {
        console.error("Failed to fetch events", error);
        return [];
    }
};


export function getEventById(eventId: number) {
    return apiFetch(`/events/${eventId}`, {
        method: "GET",
    })
}

export function createEvent(title: string, description: string, language: string, ticketPrice: number, startDate: Date, endDate: Date, categories: number[]) {
    return apiFetch(`/events`, {
        method: 'POST',
        body: JSON.stringify({
            title, description, language, ticketPrice, startDate, endDate, categories
        })
    })
}

export function updateEvent(eventId: string, data: any) {
    return apiFetch(`/events/${eventId}`, {
        method: "PUT",
        body: JSON.stringify(data),
    });
}

export function deleteEvent(eventId: string) {
    return apiFetch(`/events/${eventId}`, {
        method: "PUT",
    })
}