import React, { useState, useEffect } from "react";
import "./App.css";
import LineChart from "./components/Charts/LineChart";
import BarChart from "./components/Charts/BarChart";
import Dropdown from "./components/Dropdown/Dropdown";
import WorldwideStats from "./components/Cards/WorldwideStats";
import CountryCards from "./components/Cards/CountryCards";
import { Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  getAllDatesInRange,
  getConfirmedCasesByCountry,
  getAllCountriesAndCode,
  getSummaryData,
} from "./api/Api.js";

const useStyles = makeStyles({
  dropdownContainerStyles: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 144px",
    padding: "1em 0em 0em 0em",
  },
  titleStyles: {
    padding: "0.5em 144px 0 144px ",
  },
});

function App() {
  const classes = useStyles();
  // State declaration for country and data
  const [summaryData, setSummaryData] = useState({});
  const [isSummaryLoaded, setIsSummaryLoaded] = useState(false);
  const [country, setCountry] = useState(undefined);
  const [data, setData] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const wrapperFunc = async () => {
      setSummaryData(await getSummaryData());
      setIsSummaryLoaded(true);
      setCountry("afghanistan");
    };
    wrapperFunc();
  }, []);

  useEffect(() => {
    if (isSummaryLoaded) {
      // setOptions(getAllCountriesAndCode(summaryData));
      // setCountry("afghanistan");
    }
  }, [isSummaryLoaded]);

  // Only run this hook if the country state changes
  useEffect(() => {
    const wrapperFunc = async () => {
      const now = new Date();
      const dates = getAllDatesInRange(now);
      setData(await getConfirmedCasesByCountry(country, dates));
    };
    if (isSummaryLoaded) {
      wrapperFunc();
    }
  }, [country]);

  return (
    <div className="App">
      <header className="App-header">
        {isSummaryLoaded ? (
          <>
            <Typography variant="h5" className={classes.titleStyles}>
              Covid-19 Tracking Application
            </Typography>
            <WorldwideStats summaryData={summaryData} />
            <Typography variant="caption">
              Updated as of {summaryData.Date}
            </Typography>
            <Box className={classes.dropdownContainerStyles}>
              <Typography variant="body1">Please select a country: </Typography>
              <Dropdown
                options={getAllCountriesAndCode(summaryData)}
                setCountry={setCountry}
                setDisabled={setDisabled}
                disabled={disabled}
              />
            </Box>

            <CountryCards summaryData={summaryData} country={country} />
            <div className="flexbox">
              <LineChart data={data} />
              <BarChart data={data} />
            </div>
          </>
        ) : null}
      </header>
    </div>
  );
}

export default App;
