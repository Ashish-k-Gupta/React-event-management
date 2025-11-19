import { apiFetch } from "./api";
import type { Event } from "../types/event";



export const getEvents = async (): Promise<Event[]> => {
    try {
        const res = await apiFetch("/events/quick-list", { method: 'GET' });
        return res;
    } catch (error) {
        return [];
    }
};


export function getEventById(eventId: number) {
    return apiFetch(`/events/${eventId}`, {
        method: "GET",
    })
}

export const getSlotsByEventId = async (eventId: number) => {
    try {
        const res = await apiFetch(`/events/event-slots/${eventId}`, { method: 'GET' });
        return res;
    } catch (error) {
        throw error;
    }
}

export const getSlotById = async (slotId: number) => {
    try {
        const res = await apiFetch(`/events/buy-page/${slotId}`);
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>HERE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..')
        return res.data;
    } catch (error) {
        throw error;
    }
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