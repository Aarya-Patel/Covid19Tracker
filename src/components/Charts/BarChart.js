import React, { useRef, useEffect } from "react";
import Chart from "chart.js";
import "./Charts.css";

//Global variable to store the chart so that we can destory it when updating
let currentChart;

export default ({ data }) => {
  //Reference to the chart
  const chartRef = useRef();

  //This function creates the chart using the data and setting the new chart to currentChart
  const createChart = (data) => {
    const cvs = chartRef.current.getContext("2d");

    //Return the effect early when the data is empty
    if (JSON.stringify(data) === "[]") {
      return;
    }
    // get the country
    let country;

    [...data].map((currMonthData) => {
      country = currMonthData[0].Country;
    });

    //Get the summaryData
    const summaryData = JSON.parse(sessionStorage.getItem("summaryData"));
    const countryData = summaryData.Countries.find(
      (countryStats) => countryStats.Country === country
    );

    const { TotalConfirmed, TotalRecovered, TotalDeaths } = countryData;

    currentChart = new Chart(cvs, {
      type: "bar",
      data: {
        labels: ["Confirmed", "Recoverd", "Deaths"],
        datasets: [
          {
            label: "# of people",
            data: [TotalConfirmed, TotalRecovered, TotalDeaths],
            backgroundColor: [
              "rgba(54, 162, 235, 0.2)",
              "rgba(134, 252, 114, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: [
              "rgba(54, 162, 235, 1)",
              "rgba(134, 252, 114, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
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

  return <canvas ref={chartRef} className="ctx"></canvas>;
};
