"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Context } from "vm";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ChartJsDataFactory from "../model/ChartJsDataFactory";

ChartJS.register(ArcElement, Legend, ChartDataLabels);

interface GlobalProgressChartProps {
  notStarted: string
  inProgress: string
  completed: string
}

const GlobalProgressChart:React.FC<GlobalProgressChartProps> = (
  {notStarted, inProgress, completed}
) => {

  const data = [
    new ChartJsDataFactory(
      "Not started",
      parseFloat(notStarted),
      '%',
      "#d0bcd4",
      `70%`,
    ),
    new ChartJsDataFactory(
     "In progress",
      parseFloat(inProgress),
      '%',
      "#30c4e4",
      `70%`,
    ),
    new ChartJsDataFactory(
      "Completed",
      parseFloat(completed),
      "%",
      "#c8ecac",
      `70%`,
    ),
  ];

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 50,
        left: 85,
        right: 85,
        bottom: 50
      },
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        color: data.map((item) => item.color), 
        font: {
          weight: "bold" as const,
          size: 18,
        },
        align: 'end',
        anchor: 'end',
        clip: false,
        formatter: (value: number, context: Context) => {
          const unit = data[context.dataIndex].unit; 
          const label = data[context.dataIndex].label;
          return [`${value} ${unit}`, label];
        },
      },
    },
    cutout: data.map((item) => item.cutout),
    aspectRatio: 1
  };

  const finalData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => (item.value)),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  };
  // @ts-expect-error Trigger errors for context.raw properties, but didn't create any conflict
  return <Doughnut className="h-0 w-[450px]" data={finalData} options={options} />;
}  
export default GlobalProgressChart