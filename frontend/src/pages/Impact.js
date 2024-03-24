import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import NavBar from "../components/NavBar";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export const baroptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: "top",
        },
        title: {
            display: false,
            text: "",
        },
    },
};

const labels = ["Total Donations", "Amount Distributed to Beneficiaries"];

export const bardata = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            data: [1, 2],
            backgroundColor: [
                "rgba(0, 255, 0, 0.5)", // Color for Total Donations
                "rgba(54, 80, 235, 0.5)", // Color for Amount Distributed to Beneficiaries
            ],
        },
    ],
};

export const piedata = {
    labels: ["To Charity", "To Beneficiaries", "Lost to Fees"],
    datasets: [
        {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
        },
    ],
};

export default function Impact() {
    return (
        <>
            <NavBar />
            <h1 className="text-4xl font-bold mb-4 mt-8 ml-8">Impact</h1>
            <div className="flex flex-row">
                <div className="w-1/2 mt-12 ml-8">
                    <Bar options={baroptions} data={bardata} />
                </div>
                <div className="w-1/2 mt-12">
                    <Pie data={piedata} />
                </div>
            </div>
        </>
    );
}
