import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "70%",

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Portfolio Allocation",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },

      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ₹${context.raw.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "420px",
        margin: "40px auto",
      }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
}
