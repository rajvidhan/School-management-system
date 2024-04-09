import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

// step :1 register the all elements

export function AdminChart() {
  // function to generate random colorss
  const randomColors = (numColors) => {
    const colors = [];

    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // step 2: create the data

  const [classData, setClassData] = useState(null);
  const fetchdata = async () => {
    await axios.get("http://localhost:3000/auth/All_classes").then((result) => {
      setClassData(result.data.data);
    });
  };
  useEffect(() => {
    fetchdata();
  }, []);

  const data = {
    labels: classData && classData.map((d) => d.name),
    datasets: [
      {
        data: classData && classData.map((c) => c.totalStudents),
        backgroundColor: randomColors(classData && classData.length),
      },
    ],
  };

  // // step 3 options for chart
  const options = {
    maintainAspectRatio: false,
    width: 500,
    height: 500,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white", // change legend font color
          font: {
            size: "14",
            family: "Arial, sans-serif",
          },
        },
      },
    },
  };

  return (
    <>
      <div>
        <div className="chart">
          <Pie data={data} options={options} />
        </div>
      </div>
    </>
  );
}
