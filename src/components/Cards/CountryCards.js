import React from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  boxStyles: {
    // width: "100%",
    padding: "1em 0em 2em 0",
    margin: "0em 144px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardStyles: {
    backgroundColor: "rgba(0,0,0,0.2)",
    width: "325px",
    height: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "18px",
  },
  confirmedCard: {
    border: "1px solid rgba(54, 162, 235, 0.5)",
  },
  recoveredCard: {
    border: "1px solid rgba(134, 252, 114, 0.5)",
  },
  deathsCard: {
    border: "1px solid rgba(255, 99, 132, 0.5)",
  },
});

export default ({ summaryData, country }) => {
  const classes = useStyles();

  //
  if (country === undefined) {
    return <></>;
  }
  const countryData = summaryData.Countries.find(
    (cData) => cData.Slug === country
  );

  const { TotalConfirmed, TotalDeaths, TotalRecovered } = countryData;

  return (
    <Box className={classes.boxStyles}>
      <Card className={[classes.cardStyles, classes.confirmedCard]}>
        <CardContent>
          <Typography variant="h4">{TotalConfirmed}</Typography>
          <Typography display="inline">
            Confirmed Cases in {countryData.Country}
          </Typography>
        </CardContent>
      </Card>
      <Card className={[classes.cardStyles, classes.recoveredCard]}>
        <CardContent>
          <Typography variant="h4">{TotalRecovered}</Typography>
          <Typography display="inline">
            Recovered Cases in {countryData.Country}
          </Typography>
        </CardContent>
      </Card>
      <Card className={[classes.cardStyles, classes.deathsCard]}>
        <CardContent>
          <Typography variant="h4">{TotalDeaths}</Typography>
          <Typography display="inline">
            Deaths in {countryData.Country}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
