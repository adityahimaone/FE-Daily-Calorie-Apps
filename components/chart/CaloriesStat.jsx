import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const initData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Calories Stat",
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
    },
  ],
};

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top",
//     },
//     title: {
//       display: true,
//       //   text: "Chart.js Line Chart",
//     },
//   },
//   // reverse scale
//   scales: {
//     xAxes: [
//       {
//         ticks: {
//           reverse: true,
//         },
//       },
//     ],
//     yAxes: [
//       {
//         ticks: {
//           reverse: true,
//         },
//       },
//     ],
//   },
// };

// make options chart js with reverse x / category scale
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      reverse: true,
    },
    title: {
      display: true,
      //   text: "Chart.js Line Chart",
    },
  },
  // reverse scale
  scales: {
    myScale: {
      yAxes: [
        {
          reverse: true,
        },
      ],
    },
  },
};

export default function CaloriesStat(props) {
  const { dataset } = props;
  const [data, setData] = useState(initData);

  useEffect(() => {
    setData(dataset);
  }, [dataset]);

  return (
    <div className=" max-w-screen-md">
      <Line options={options} data={data} />
    </div>
  );
}
