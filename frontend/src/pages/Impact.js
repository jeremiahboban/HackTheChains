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
import { useState, useEffect, useMemo, useParams } from "react";

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
    scales: {
        x: {
            gridLines: {
                display: false, // Hide x-axis gridlines
            },
        },
        y: {
            gridLines: {
                display: false, // Hide y-axis gridlines
            },
        },
    },
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

export default function Impact() {
    const [bardata, setBarData] = useState({
        labels: labels,
        datasets: [
            {
                label: "Dataset 1",
                data: [0, 0],
                backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 235, 162, 1)",
                ],
            },
        ],
    });
    const [piedata, setPieData] = useState({
        labels: ["Total Donations", "To Beneficiaries", "Lost to Fees"],
        datasets: [
            {
                label: "# of Votes",
                data: [0, 0, 0],
                backgroundColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 235, 162, 1)",
                    "rgba(255, 206, 86, 1)",
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
    });

    useEffect(() => {
        const profitArray = JSON.parse(localStorage.getItem("profitArray"));
        const feesArray = JSON.parse(localStorage.getItem("transactionFees"));

        console.log("Profits: ", profitArray);
        console.log("Fees: ", feesArray);
        // Calculate the total profit by summing the elements in profitArray
        const totalFees =
            173.84 *
            0.000000001 *
            feesArray.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
            );

        // Calculate the total of positive numbers in profitArray
        const totalToCharity =
            173.84 *
            0.000000001 *
            profitArray.reduce((accumulator, currentValue) => {
                if (currentValue > 0) {
                    return accumulator + currentValue;
                } else {
                    return accumulator; // Ignore non-positive values
                }
            }, 0);

        // Calculate the total of positive numbers in profitArray
        const totalToBeneficiary =
            -173.84 *
            0.000000001 *
            profitArray.reduce((accumulator, currentValue) => {
                if (currentValue < 0) {
                    return accumulator + currentValue;
                } else {
                    return accumulator; // Ignore non-positive values
                }
            }, 0);

        // Use the totalProfit variable as needed
        console.log("Total Fees:", totalFees);
        console.log("Total To Charity:", totalToCharity);
        console.log("Total To Beneficiary:", totalToBeneficiary);

        const updatedBarData = {
            labels,
            datasets: [
                {
                    label: "Dataset 1",
                    data: [totalToCharity, totalToBeneficiary], // Update data here
                    backgroundColor: [
                        "rgba(3, 232, 252, 1)", // Color for Total Donations
                        "rgba(59, 130, 246, 1)", // Color for Amount Distributed to Beneficiaries
                    ],
                },
            ],
        };

        const updatedPieData = {
            labels: ["Total Donations", "Total to Beneficiaries", "Lost to Fees"],
            datasets: [
                {
                    label: "# of Votes",
                    data: [totalToCharity, totalToBeneficiary, totalFees], // Update data here
                    backgroundColor: [
                        "rgba(3, 232, 252, 1)",
                        "rgba(59, 130, 246, 1)",
                        "rgba(255, 206, 86, 1)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 0,
                },
            ],
        };

        setBarData(updatedBarData);
        setPieData(updatedPieData);
    }, []);

    return (
        <>
            <NavBar />
            <h1 className="text-4xl font-bold mb-4 mt-8 ml-8">Impact</h1>
            <div className="flex flex-row flex-wrap justify-evenly">
                <div className="flex-grow max-w mt-12 ml-8">
                    <Bar options={baroptions} data={bardata} />
                </div>
                <div className="flex-grow max-w mt-12 mx-8">
                    <Pie data={piedata} />
                </div>
            </div>
        </>
    );
}
