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

//** Tilesets **\\
// Contours Layer
var contorsTile = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.mapbox-terrain-v2/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'mapbox.mapbox-terrain-v2',
  format: 'image/png',
  transparency: 'true',
  maxZoom: 17,
  opacity: 0.5
});

var streetlightsTile = L.tileLayer('https://api.tiles.mapbox.com/v4/surv-mqp.5lmjns02/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'streetlight-locations-8rhrqp',
  format: 'image/png',
  type: 'raster',
  attribution: 'StreetLight Data © <a href="https://data.boston.gov/">Analyze Boston</a>',
  transparent: true,
  maxZoom: 17,
  opacity: 0.5
});

var bikestationsTile = L.tileLayer('https://api.tiles.mapbox.com/v4/surv-mqp.8b5gs9dt/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'Hubway_Stations-noName-by4u5m',
  format: 'image/png',
  type: 'raster',
  attribution: 'HubwayStation Data © <a href="https://www.thehubway.com/">The Hubway</a>',
  transparent: true,
  maxZoom: 17,
  opacity: 0.5
});

var overlayMaps = {
  "<i class='fa fa-dot-circle-o'></i> Contors": contorsTile,
  "<i class='fa fa-lightbulb-o'></i> <span style='background-color: #579A5D'>Street Lights</span>": streetlightsTile,
  "<i class='fa fa-bicycle'></i> <span style='background-color: #aa85b2'>Hubway Stations</span>": bikestationsTile,
  // "<i class='fa fa-ban'></i> <span>TEST</span>": myRenderer,
};

//** Construct the map **\\
// var map = L.map('mapid', {
//   center: [42.3601, -71.0589],
//   zoom: 12,
//   renderer: L.canvas({ padding: 0.5 }),
//   layers: [lightView,streetlightsTile,bikestationsTile]
// });

var myRenderer = L.canvas({ padding: 0.5 });

for (var i = 0; i < 100000; i += 1) { // 100k points
	L.circleMarker(getRandomLatLng(), {
  	renderer: myRenderer
  });
}

function getRandomLatLng() {
	return [
  	-90 + 180 * Math.random(),
    -180 + 360 * Math.random()
  ];
}

var map = L.map("mapid", {
  center: [48.85, 2.35],
  zoom: 8,
  layers: [streetView],
  preferCanvas: true
});

myRenderer.addTo(map);

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
