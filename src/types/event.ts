export interface Event {
    id: number;
    title: string;
    language: string;
    ticketPrice: string;
    startDate: string;
    endDate: string;
    user: {
        id: number;
        firstName: string;
    };
}