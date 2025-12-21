
export const FormatDate = (date: Date) => {

    function formatDateAndMonth(date: Date) {
        const month = new Date(date).toLocaleString('default', { month: 'short' })
        const day = new Date(date).getDate()
        return `${day}-${month}`
    }


    function FormatTime(date: Date) {
        let hours = new Date(date).getHours();
        const minutes = new Date(date).getMinutes();

        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours} ${minutes}`
    }

    return {
        date: formatDateAndMonth(date),
        time: FormatTime(date),
    }
}