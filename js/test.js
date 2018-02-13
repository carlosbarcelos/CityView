//** Base Maps **\\
var streetView = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g',{
  id: 'mapbox.streets',
  attribution: 'Imagery © <a href="http://mapbox.com">Mapbox</a>'
});
var darkView = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g',{
  id: 'mapbox.dark',
  attribution: 'Imagery © <a href="http://mapbox.com">Mapbox</a>'
});
var lightView = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g',{
  id: 'mapbox.light',
  attribution: 'Imagery © <a href="http://mapbox.com">Mapbox</a>'
});

var baseMaps = {
  "Streets": streetView,
  "Dark": darkView,
  "Light": lightView
};

//** Construct the map **\\
var map = L.map('mapid', {
  renderer: L.canvas(),
  center: [42.3601, -71.0589],
  zoom: 8,
  layers: [lightView]
  // layers: [lightView,streetlightsTile,bikestationsTile]
});

//** Tilesets **\\
// Contours Layer
var contorsTile = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.mapbox-terrain-v2/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'mapbox.mapbox-terrain-v2',
  format: 'image/png',
  transparency: 'true',
  maxZoom: 17,
  opacity: 0.5
});

//Streetlights Layer
var streetlightsTile = L.tileLayer('https://api.tiles.mapbox.com/v4/surv-mqp.5lmjns02/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'streetlight-locations-8rhrqp',
  format: 'image/png',
  type: 'raster',
  attribution: 'StreetLight Data © <a href="https://data.boston.gov/">Analyze Boston</a>',
  transparent: true,
  maxZoom: 17,
  opacity: 0.5
});

//Bike Stations Layer
var bikestationsTile = L.tileLayer('https://api.tiles.mapbox.com/v4/surv-mqp.8b5gs9dt/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'Hubway_Stations-noName-by4u5m',
  format: 'image/png',
  type: 'raster',
  attribution: 'HubwayStation Data © <a href="https://www.thehubway.com/">The Hubway</a>',
  transparent: true,
  maxZoom: 17,
  opacity: 0.5
});

//Canvas Layer
var myRenderer = L.canvas({ padding: 0.5 });
/**/


function parseStreetlights(){
  var parseResult = parseCSV("../datasets/spatial-static_temporal-static/streetlight-locations.csv");

  console.log(parseResult);
  console.log(parseResult.length);
  console.log(parseResult[0]);
  console.log(parseResult[1]);
  console.log(parseResult[2]);
};




// var dataLength = parseResult[0];
// var latList = parseResult[1];
// var lonList = parseResult[2];

// for (var i = 0; i < dataLength; i++) {
//   L.circleMarker(getLatLon(i), {
//     renderer: myRenderer
//   }).addTo(map).bindPopup('marker ' + i);
// }
//
// function getLatLon(i) {
// 	return [
//     latList[i],
//   	lonList[i]
//   ];
// }
/**/

var overlayMaps = {
  "<i class='fa fa-dot-circle-o'></i> Contors": contorsTile,
  "<i class='fa fa-lightbulb-o'></i> <span style='background-color: #579A5D'>Street Lights</span>": streetlightsTile,
  "<i class='fa fa-bicycle'></i> <span style='background-color: #aa85b2'>Hubway Stations</span>": bikestationsTile,
  // "Random Circles": myRenderer
};

//** Controls **\\
// Layers control
L.control.layers(baseMaps, overlayMaps).addTo(map);

// Information button
var informationContent = `<p>This interaction is comprised of two datasets: streetlight locations and Hubway bike stations.</br>
It is interesting to note the placement of bike stations and note that they tend to occur near streetlights.</p>`;
var informationPopup = L.popup().setContent(informationContent);

L.easyButton('fa-info-circle fa-lg', function(btn, map){
  informationPopup.setLatLng(map.getCenter()).openOn(map);
}).addTo(map);

L.easyButton('On', function(btn, map){
  myRenderer.addTo(map);
}).addTo(map);

L.easyButton('Off', function(btn, map){
  myRenderer.removeFrom(map);
}).addTo(map);


L.easyButton('Off', function(btn, map){
  parseStreetlights();
}).addTo(map);
