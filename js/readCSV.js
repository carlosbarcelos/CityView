// var dataLength = 0;
// var latList = [];
// var lonList = [];
//
// function parseCSV(fileName) {
//   d3.csv(fileName, function(d) {
//   return {
//     lat: +d.lat,
//     lon: +d.lon
//   };
// }, function(d) {
//   dataLength = d.length;
//   for (var i = 0; i < d.length; i++) {
//     latList.push(d[i].lat);
//     lonList.push(d[i].lon);
//   }
//   return [getDataLength(), getLat(), getLon()];
// })};
//
// function getDataLength(){
//   return dataLength;
// };
//
// function getLat(){
//   return latList;
// };
//
// function getLon(){
//   return lonList;
// };

function parseCSV(fileName) {
  var returnArray = [];
  d3.csv(fileName, function (d) {
    var dataLength = d.length;

    var latList = [];
    var lonList = [];

    for (var i = 0; i < d.length; i++) {
      latList.push(Number(d[i].lat));
      lonList.push(Number(d[i].lon));
    }

    returnArray.push(dataLength);
    this.returnArray.push(latList);
    this.returnArray.push(lonList);
    console.log(this.returnArray);
    console.log(this.returnArray.length);
    return returnArray;
  })
  console.log(this.returnArray);
  console.log(this.returnArray.length);
  return this.returnArray;
};
