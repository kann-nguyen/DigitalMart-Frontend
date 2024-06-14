export const SERVER = "http://localhost:8000/api";

export const pause = async (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

export const formatDate = (dateString) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(dateString);

    const month = months[date.getMonth()];
    const day = ("0" + date.getDate()).slice(-2); // Đảm bảo có 2 chữ số cho ngày
    const year = date.getFullYear();
    const hours = ("0" + date.getHours()).slice(-2); // Đảm bảo có 2 chữ số cho giờ
    const minutes = ("0" + date.getMinutes()).slice(-2); // Đảm bảo có 2 chữ số cho phút
    const seconds = ("0" + date.getSeconds()).slice(-2); // Đảm bảo có 2 chữ số cho giây
    const weekDay = days[date.getDay()];

    return `${month} ${day} ${year} ${hours}:${minutes}:${seconds} (${weekDay})`;
}