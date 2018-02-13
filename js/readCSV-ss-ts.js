var streetlightArray = [];
var hubwayArray = [];

// Get the streetlight information
d3.csv("../datasets/spatial-static_temporal-static/streetlight-locations.csv", function (d) {
  var dataLength = d.length;
  var latList = [];
  var lonList = [];

  for (var i = 0; i < d.length; i++) {
    latList.push(Number(d[i].lat));
    lonList.push(Number(d[i].lon));
  }

  streetlightArray.push(dataLength);
  streetlightArray.push(latList);
  streetlightArray.push(lonList);
});
// Get the bike station information
d3.csv("../datasets/spatial-static_temporal-static/Hubway_Stations.csv", function (d) {
  var dataLength = d.length;
  var latList = [];
  var lonList = [];

  for (var i = 0; i < d.length; i++) {
    latList.push(Number(d[i].lat));
    lonList.push(Number(d[i].lon));
  }

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
