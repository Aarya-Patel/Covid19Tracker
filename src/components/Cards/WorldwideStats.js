import React from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  boxStyles: {
    // width: "100%",
    padding: "1em 0em 0 0",
    margin: "0em 144px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardStyles: {
    width: "325px",
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: "18px",
  },
  confirmedCard: {
    border: "1px solid rgba(54, 162, 235, 0.5)",
    backgroundColor: "rgba(54, 162, 235, 0.5)",
  },
  recoveredCard: {
    border: "1px solid rgba(134, 252, 114, 0.5)",
    backgroundColor: "rgba(134, 252, 114, 0.5)",
  },
  deathsCard: {
    border: "1px solid rgba(255, 99, 132, 0.5)",
    backgroundColor: "rgba(255, 99, 132, 0.5)",
  },
});

export default ({ summaryData }) => {
  const classes = useStyles();

  const { TotalConfirmed, TotalDeaths, TotalRecovered } = summaryData.Global;

  return (
    <Box className={classes.boxStyles}>
      <Card className={[classes.cardStyles, classes.confirmedCard]}>
        <CardContent>
          <Typography variant="h4">{TotalConfirmed}</Typography>
          <Typography display="inline">Confirmed Cases Worldwide</Typography>
        </CardContent>
      </Card>
      <Card className={[classes.cardStyles, classes.recoveredCard]}>
        <CardContent>
          <Typography variant="h4">{TotalRecovered}</Typography>
          <Typography display="inline">Recovered Cases Worldwide</Typography>
        </CardContent>
      </Card>
      <Card className={[classes.cardStyles, classes.deathsCard]}>
        <CardContent>
          <Typography variant="h4">{TotalDeaths}</Typography>
          <Typography display="inline">Deaths Worldwide</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
