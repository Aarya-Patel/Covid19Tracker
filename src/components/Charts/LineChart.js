import React, { useEffect, useRef } from "react";
import Chart from "chart.js";
import "./Charts.css";

//Global variable to store the chart so that we can destory it when updating
let currentChart;

export default ({ data }) => {
  // Created the reference to the canvas that will hold the chart
  let chartRef = useRef();

  // console.log(data);
  const createChart = (data) => {
    const cvs = chartRef.current.getContext("2d");
    //Return the effect early when the data is empty
    if (JSON.stringify(data) === "[]") {
      return;
    }
    //Get the country for this data
    let country;

    //Get labels for the graph
    const labels = [...data].map((currMonthData) => {
      // console.log(currMonthData[0]);
      const currDate = currMonthData[0].Date;
      country = currMonthData[0].Country;
      // console.log(new Date(currDate).toDateString());
      return new Date(currDate).toDateString();
    });

    // Get the appropriate cases confirmed data
    const casesConfirmedData = [...data].map((currMonthData) => {
      const { Cases } = currMonthData[0];
      return Cases;
    });

    currentChart = new Chart(cvs, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "# of Covid-19 Occurences",
            data: casesConfirmedData,
            backgroundColor: ["rgba(123, 79, 52, 0.4)"],
            pointBackgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderColor: ["rgba(244, 244, 244, 0.4)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: {
          easing: "easeOutQuart",
        },
        title: {
          display: true,
          text: country,
          fontSize: 18,
          position: "left",
        },
        layout: {
          padding: {
            left: 25,
            right: 25,
          },
        },
      },
    });
  };

  // On each re-render destroy the chart and repaint it
  useEffect(() => {
    if (typeof currentChart !== "undefined") {
      currentChart.destroy();
    }
    if (JSON.stringify(data) !== "[]") {
      createChart(data);
    }
  });

  return <canvas className="ctx" ref={chartRef}></canvas>;
};
