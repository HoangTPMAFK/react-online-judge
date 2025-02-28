import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Rank() {
    const columns = [
        {
            name: "#",
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Name",
            selector: row => row.username,
            sortable: true
        },
        {
            name: "Point",
            selector: row => row.point,
            sortable: true
        }
    ];

    const [data, setData] = useState([
        { id: 1, username: "coder123", total: 1000, point: 200 },
        { id: 2, username: "algorithm_king", total: 980, point: 190 },
        { id: 3, username: "quicksolver", total: 970, point: 185 },
        { id: 4, username: "dev_hero", total: 950, point: 180 },
        { id: 5, username: "tech_guru", total: 940, point: 178 },
        { id: 6, username: "binary_master", total: 920, point: 176 },
        { id: 7, username: "algo_wizard", total: 910, point: 172 },
        { id: 8, username: "code_maniac", total: 900, point: 240 },
        { id: 9, username: "bit_buster", total: 890, point: 168 },
        { id: 10, username: "python_pro", total: 880, point: 165 },
        { id: 11, username: "java_juggler", total: 870, point: 160 },
        { id: 12, username: "debugging_master", total: 860, point: 155 },
        { id: 13, username: "cpp_queen", total: 850, point: 150 },
        { id: 14, username: "algorithm_ninja", total: 840, point: 145 },
        { id: 15, username: "solver_smith", total: 830, point: 140 },
        { id: 16, username: "code_expert", total: 820, point: 138 },
        { id: 17, username: "binary_boy", total: 810, point: 135 },
        { id: 18, username: "dev_warrior", total: 800, point: 130 },
        { id: 19, username: "fast_coder", total: 790, point: 125 },
        { id: 20, username: "quickthinker", total: 780, point: 120 },
        { id: 21, username: "tech_whiz", total: 770, point: 118 },
        { id: 22, username: "code_wizard", total: 760, point: 115 },
        { id: 23, username: "solver_queen", total: 750, point: 110 },
        { id: 24, username: "binary_bro", total: 740, point: 105 },
        { id: 25, username: "algo_prodigy", total: 730, point: 102 },
        { id: 26, username: "bit_slayer", total: 720, point: 100 },
        { id: 27, username: "coder_king", total: 710, point: 98 },
        { id: 28, username: "data_dynamo", total: 700, point: 95 },
        { id: 29, username: "tech_savant", total: 690, point: 92 },
        { id: 30, username: "coding_champ", total: 680, point: 90 },
        { id: 31, username: "algorithm_expert", total: 670, point: 88 },
        { id: 32, username: "programming_guru", total: 660, point: 85 },
        { id: 33, username: "fast_fingers", total: 650, point: 83 },
        { id: 34, username: "logic_master", total: 640, point: 80 },
        { id: 35, username: "dev_mastermind", total: 630, point: 78 },
        { id: 36, username: "code_king", total: 620, point: 75 },
        { id: 37, username: "quick_coder", total: 610, point: 72 },
        { id: 38, username: "algorithm_master", total: 600, point: 70 },
        { id: 39, username: "binary_queen", total: 590, point: 68 },
        { id: 40, username: "solver_king", total: 580, point: 65 },
        { id: 41, username: "debugging_wizard", total: 570, point: 63 },
        { id: 42, username: "code_warrior", total: 560, point: 60 },
        { id: 43, username: "tech_expert", total: 550, point: 58 },
        { id: 44, username: "dev_legend", total: 540, point: 55 },
        { id: 45, username: "binary_ninja", total: 530, point: 53 },
        { id: 46, username: "code_hero", total: 520, point: 50 },
        { id: 47, username: "solver_wizard", total: 510, point: 48 },
        { id: 48, username: "programming_sensei", total: 500, point: 45 },
        { id: 49, username: "tech_titan", total: 490, point: 43 },
        { id: 50, username: "coder_genius", total: 480, point: 40 },
        { id: 51, username: "algorithm_ace", total: 470, point: 38 },
        { id: 52, username: "bit_guru", total: 460, point: 35 },
        { id: 53, username: "logic_queen", total: 450, point: 33 },
        { id: 54, username: "dev_whiz", total: 440, point: 30 },
        { id: 55, username: "quick_solver", total: 430, point: 28 },
        { id: 56, username: "coding_legend", total: 420, point: 25 },
        { id: 57, username: "algorithm_savant", total: 410, point: 23 },
        { id: 58, username: "fast_dev", total: 400, point: 20 },
        { id: 59, username: "programming_master", total: 390, point: 18 },
        { id: 60, username: "tech_champ", total: 380, point: 15 },
    ]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:8080/contest-programing/api/user/");
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const jsonData = await response.json();
                setData([...jsonData.data]
                    .sort((a, b) => a.point - b.point) || Object);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [])

    // Sort data by points in descending order and slice top 12
    const top12Data = data.sort((a, b) => b.point - a.point).slice(0, 12);

    // Chart.js data structure
    const chartData = {
        labels: top12Data.map(user => user.username),
        datasets: [
            {
                label: 'Points',
                data: top12Data.map(user => user.point),
                backgroundColor: '#4CAF50', // Green bars
                borderColor: '#388E3C', // Darker green
                borderWidth: 1
            }
        ]
    };

    // Chart options (you can customize these)
    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    };

    const customeStyles = {
        headRow: {
            style: {
                backgroundColor: "#f1f5f9",
            },
        },
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "14px",
                paddingLeft: "12px",
                paddingRight: "12px",
            },
        },
        cells: {
            style: {
                paddingLeft: "12px",
                paddingRight: "12px",
            },
        },
        rows: {
            style: {
                minHeight: "48px",
            },
        },
    };

    return (
        <div className="max-w-5xl bg-white shadow-sm mx-auto">
            <div className="flex flex-row justify-between items-center p-4">
                <div className="text-2xl font-semibold">Ranking</div>
                <input className="w-60 px-2 py-2 border" type="text" name="search-input" placeholder="Search" />
            </div>
            <div className="p-4">
                <Bar data={chartData} options={chartOptions} />
            </div>
            <DataTable columns={columns} data={data} pagination striped pointerOnHover customStyles={customeStyles} onRowClicked={row => window.location.href = `/user/${row.id}`} />
        </div>
    );
}

export default Rank;
