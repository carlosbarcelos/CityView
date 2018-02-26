/* Read in CSV files using D3 and provide getter functions for important information */
var streetlightArray = [];
var hubwayArray = [];

// Get the streetlight information
d3.csv("../datasets/static-data/streetlight-locations.csv", function (d) {
  var dataLength = d.length;
  var latList = [];
  var lonList = [];
  // iterate over all data points
  for (var i = 0; i < d.length; i++) {
    latList.push(Number(d[i].lat));
    lonList.push(Number(d[i].lon));
  }
  // add all arrays to a single array to be passed through getter
  streetlightArray.push(dataLength);
  streetlightArray.push(latList);
  streetlightArray.push(lonList);
});
// Get the bike station information
d3.csv("../datasets/static-data/Hubway_Stations.csv", function (d) {
  var dataLength = d.length;
  var latList = [];
  var lonList = [];
  // iterate over all data points
  for (var i = 0; i < d.length; i++) {
    latList.push(Number(d[i].lat));
    lonList.push(Number(d[i].lon));
  }
  // add all arrays to a single array to be passed through getter
  hubwayArray.push(dataLength);
  hubwayArray.push(latList);
  hubwayArray.push(lonList);
});

// Return the streetlight information
function getStreetlights(){
  return streetlightArray;
};

// Return the bike station information
function getHubwayStations(){
  return hubwayArray;
};
