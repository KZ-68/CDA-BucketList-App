"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface GlobalProgressChartProps {
  notStarted: string
  inProgress: string
  completed: string
}

const GlobalProgressChart:React.FC<GlobalProgressChartProps> = (
  {notStarted, inProgress, completed}
) => {

  const data = [
    {
      label: "Not started",
      value: notStarted,
      unit: '%',
      color: "#d0bcd4",
      cutout: `70%`,
    },
    {
      label: "In progress",
      value: inProgress,
      unit: '%',
      color: "#30c4e4",
      cutout: `70%`,
    },
    {
      label: "Completed",
      value: completed,
      unit: "%",
      color: "#c8ecac",
      cutout: `70%`,
    },
  ]

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context:{raw:{value:string,unit:string}}) => {
            return `${context.raw.value} ${context.raw.unit}`
          }
        }
      }
    },
    cutout: data.map((item) => item.cutout),
    aspectRatio: 1
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => ({"value": item.value, "unit": item.unit})),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
        dataVisibility: new Array(data.length).fill(true),
      },
    ],
  };
  // @ts-expect-error Trigger errors for context.raw properties, but didn't create any conflict
  return <Doughnut data={finalData} options={options} />;
}

export default GlobalProgressChart