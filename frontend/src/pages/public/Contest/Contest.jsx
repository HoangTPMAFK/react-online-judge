import ContestList from "../../../components/ContestList";

function Contests() {
    const contests = [
        { no: 1, title: "2024 ACM Qualifier Round 2", date: "2024-9-26 13:00", duration: "16 days", status: "Underway" },
        { no: 2, title: "2024 ACM Qualifier", date: "2024-9-19 13:00", duration: "7 days", status: "Ended" },
        { no: 3, title: "University Programming Contest", date: "2024-3-9 12:30", duration: "4 hours", status: "Ended" },
        { no: 4, title: "QDU 2023 ACM Training", date: "2023-12-3 16:20", duration: "5 hours", status: "Ended" },
        { no: 5, title: "2024 ACM Qualifier Round 2", date: "2024-9-26 13:00", duration: "16 days", status: "Underway" },
        { no: 6, title: "2024 ACM Qualifier", date: "2024-9-19 13:00", duration: "7 days", status: "Ended" },
        { no: 7, title: "University Programming Contest", date: "2024-3-9 12:30", duration: "4 hours", status: "Not_Started" },
        { no: 8, title: "QDU 2023 ACM Training", date: "2023-12-3 16:20", duration: "5 hours", status: "Ended" },
        { no: 9, title: "2024 ACM Qualifier Round 2", date: "2024-9-26 13:00", duration: "16 days", status: "Underway" },
        { no: 10, title: "2024 ACM Qualifier", date: "2024-9-19 13:00", duration: "7 days", status: "Not_Started" },
        { no: 11, title: "University Programming Contest", date: "2024-3-9 12:30", duration: "4 hours", status: "Ended" },
        { no: 12, title: "QDU 2023 ACM Training", date: "2023-12-3 16:20", duration: "5 hours", status: "Not_Started" },
        { no: 13, title: "2024 ACM Qualifier Round 2", date: "2024-9-26 13:00", duration: "16 days", status: "Underway" },
        { no: 14, title: "2024 ACM Qualifier", date: "2024-9-19 13:00", duration: "7 days", status: "Ended" },
        { no: 15, title: "University Programming Contest", date: "2024-3-9 12:30", duration: "4 hours", status: "Underway" },
        { no: 16, title: "QDU 2023 ACM Training", date: "2023-12-3 16:20", duration: "5 hours", status: "Ended" },
    ]; 

    return(
    <div className="max-w-5xl bg-white shadow-sm mx-auto">
        <ContestList contests={contests}/>
    </div>)
}

export default Contests