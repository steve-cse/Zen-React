import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart(props) {
  let delayed;
  return (
    
    <PolarArea
      data={props.chartData}
      options={{
      
        plugins: {
          title: {
            display: true,
            text: props.chartTitle,
          },
         
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (
              context.type === "data" &&
              context.mode === "default" &&
              !delayed
            ) {
              delay = context.dataIndex * 300 + context.datasetIndex * 100;
            }
            return delay;
          },
        },
      }}
    />
  );
}

export default BarChart;
