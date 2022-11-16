const getPublishedTime = (ms) => {
    const publishedDate = new Date(Number(ms));
    const currentDate = new Date();
    const differenceTime = Date.now() - Number(ms);
    if (differenceTime < 10000) {
        return "только что";
    } else if (differenceTime < 60000) {
        return "меньше минуты назад";
    } else if (differenceTime <= 1859999) {
        const minutes = Math.floor(differenceTime / 60000);
        let minutesString = "минут";
        if (minutes % 10 === 1 && Math.floor((minutes / 10) % 10) !== 1) {
            minutesString = "минута";
        } else if (
            (minutes % 10 === 2 || minutes % 10 === 3 || minutes % 10 === 4) &&
            Math.floor((minutes / 10) % 10) !== 1
        ) {
            minutesString = "минуты";
        }
        return minutes + " " + minutesString + " назад";
    } else if (
        differenceTime < 86400000 &&
        publishedDate.getMinutes() > currentDate.getMinutes()
    ) {
        const hours =
            publishedDate.getHours() < 10
                ? "0" + publishedDate.getHours()
                : publishedDate.getHours();
        const minutes =
            publishedDate.getMinutes() < 10
                ? "0" + publishedDate.getMinutes()
                : publishedDate.getMinutes();
        return hours + ":" + minutes;
    } else if (
        publishedDate.getFullYear() === currentDate.getFullYear() ||
        (publishedDate.getFullYear() !== currentDate.getFullYear() &&
            publishedDate.getMonth() > currentDate.getMonth()) ||
        (publishedDate.getFullYear() !== currentDate.getFullYear() &&
            publishedDate.getMonth() === currentDate.getMonth() &&
            publishedDate.getDate() > currentDate.getDate())
    ) {
        return (
            publishedDate.getDate() +
            " " +
            getMonthName(publishedDate.getMonth())
        );
    } else {
        return (
            publishedDate.getDate() +
            " " +
            getMonthName(publishedDate.getMonth()) +
            " " +
            publishedDate.getFullYear()
        );
    }
};

function getMonthName(month) {
    const arr = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    return arr[month];
}

export default getPublishedTime;
