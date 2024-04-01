import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);


export function AdminChart({employees}) {
  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
  labels: employees.map((course) => course.name),
  datasets: [
    {
      data: employees.map((course) => course.gender),
     
    },
  ],
};

  return <Chart type="bar" data={data} />;
}
