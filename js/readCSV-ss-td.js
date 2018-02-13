var mondayRecyclingArray = [];
var tuesdayRecyclingArray = [];
var wednesdayRecyclingArray = [];
var thursdayRecyclingArray = [];
var fridayRecyclingArray = [];

// Monday recycling information
d3.csv("../datasets/spatial-static_temporal-dynamic/RecyclingMonday.csv", function (d) {
  var dataLength = d.length;
  var latList = [];
  var lonList = [];
  var day = d[0].day;

  for (var i = 0; i < d.length; i++) {
    latList.push(Number(d[i].lat));
    lonList.push(Number(d[i].lon));
  }

  mondayRecyclingArray.push(dataLength);
  mondayRecyclingArray.push(latList);
  mondayRecyclingArray.push(lonList);
  mondayRecyclingArray.push(day);
});

// Tuesday recycling information
d3.csv("../datasets/spatial-static_temporal-dynamic/RecyclingTuesday.csv", function (d) {
  var dataLength = d.length;
  var latList = [];
  var lonList = [];
  var day = d[0].day;

  for (var i = 0; i < d.length; i++) {
    latList.push(Number(d[i].lat));
    lonList.push(Number(d[i].lon));
  }

  tuesdayRecyclingArray.push(dataLength);
  tuesdayRecyclingArray.push(latList);
  tuesdayRecyclingArray.push(lonList);
  tuesdayRecyclingArray.push(day);
});

// Wednesday recycling information
d3.csv("../datasets/spatial-static_temporal-dynamic/RecyclingWednesday.csv", function (d) {
  var dataLength = d.length;
  var latList = [];
  var lonList = [];
  var day = d[0].day;

  for (var i = 0; i < d.length; i++) {
    latList.push(Number(d[i].lat));
    lonList.push(Number(d[i].lon));
  }

  wednesdayRecyclingArray.push(dataLength);
  wednesdayRecyclingArray.push(latList);
  wednesdayRecyclingArray.push(lonList);
  wednesdayRecyclingArray.push(day);
});

// Thursday recycling information
d3.csv("../datasets/spatial-static_temporal-dynamic/RecyclingThursday.csv", function (d) {
  var dataLength = d.length;
  var latList = [];
  var lonList = [];
  var day = d[0].day;

  for (var i = 0; i < d.length; i++) {
    latList.push(Number(d[i].lat));
    lonList.push(Number(d[i].lon));
  }

  thursdayRecyclingArray.push(dataLength);
  thursdayRecyclingArray.push(latList);
  thursdayRecyclingArray.push(lonList);
  thursdayRecyclingArray.push(day);
});

// Friday recycling information
d3.csv("../datasets/spatial-static_temporal-dynamic/RecyclingFriday.csv", function (d) {
  var dataLength = d.length;
  var latList = [];
  var lonList = [];
  var day = d[0].day;

  for (var i = 0; i < d.length; i++) {
    latList.push(Number(d[i].lat));
    lonList.push(Number(d[i].lon));
  }

  fridayRecyclingArray.push(dataLength);
  fridayRecyclingArray.push(latList);
  fridayRecyclingArray.push(lonList);
  fridayRecyclingArray.push(day);
});

//** Return recycling by day**//
function getMondayRecycling(){
  return mondayRecyclingArray;
};

function getTuesdayRecycling(){
  return tuesdayRecyclingArray;
};

function getWednesdayRecycling(){
  return wednesdayRecyclingArray;
};

function getThursdayRecycling(){
  return thursdayRecyclingArray;
};

function getFridayRecycling(){
  return fridayRecyclingArray;
};
