// Base URI that can be concatenated to create more complex queries
const BASE_URL = "https://api.covid19api.com";

const getSummaryData = async () => {
  const url = `${BASE_URL}/summary`;
  let data;

  if (sessionStorage.getItem("summaryData")) {
    data = JSON.parse(sessionStorage.getItem("summaryData"));
  } else {
    data = await (await fetch(url)).json();
    sessionStorage.setItem("summaryData", JSON.stringify(data));
  }
  return data;
};

const getAllCountriesAndCode = (summaryData) => {
  const mapping = summaryData.Countries.map((country) => {
    return { country: country.Country, slug: country.Slug };
  });

  return mapping;
};

// Returns an array of all the api calls for this country and dates
// @param country - the country <string>
// @param dates - array of date objects
const getConfirmedCasesByCountry = async (country, dates) => {
  // Await the promise.all and convert each json() promise to extract the data
  const temp = await Promise.all(
    dates.slice(-8, dates.length).map(async (date) => {
      // console.log(date);
      //Set the nextDate to be the next day
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      // Api url
      const url = `${BASE_URL}/total/country/${country}/status/confirmed?from=${date.toISOString()}&to=${nextDate.toISOString()}`;
      // console.log(url);
      const data = await fetch(url).then((res) => res.json()); // We want to await the response and send out another promise with json()
      return data;
    })
  );
  // console.log(temp);
  return temp;
};

// This method returns an array of dates from all the months between the startDate and endDate inclusively
const getAllDatesInRange = (endDate) => {
  const temp = new Date(endDate);
  temp.setDate(temp.getDate() - 3);
  const listOfDates = [temp];
  const currentDate = new Date(temp);

  //We want to set the date to the first day of each month
  // Must format everything into UTC format
  currentDate.setUTCDate(1);
  currentDate.setUTCHours(0);
  currentDate.setUTCMinutes(0);
  currentDate.setUTCSeconds(0);
  for (let i = 0; i < 7; i++) {
    console.log(currentDate);
    //Update the date and append it into the array
    if (currentDate.toISOString() !== endDate.toISOString()) {
      listOfDates.push(new Date(currentDate));
    }
    currentDate.setUTCHours(0);
    currentDate.setUTCMonth(currentDate.getUTCMonth() - 1);
  }
  console.log(listOfDates);
  return [...listOfDates].reverse();
};

export {
  getAllDatesInRange,
  getConfirmedCasesByCountry,
  getAllCountriesAndCode,
  getSummaryData,
};
