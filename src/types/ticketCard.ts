export type ticketCardProps = {
    eventTitle: string;
    categories: string;
    startDateTime: string;
    endDateTime: string;
    venue: string;
    ticketPrice: number;
    onButtonClick: () => void;
}