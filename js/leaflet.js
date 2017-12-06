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
var streetlightsTile = L.tileLayer('https://api.tiles.mapbox.com/v4/surv-mqp.5lmjns02/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'streetlight-locations-8rhrqp',
  format: 'image/png',
  attribution: 'StreetLight Data © <a href="https://data.boston.gov/">Analyze Boston</a>',
  transparency: 'true',
  maxZoom: 17,
  opacity: 0.5
});

streetlightsTile.setStyle({fillColor :'blue'})

// Contours Layer
var contorsTile = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.mapbox-terrain-v2/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'mapbox.mapbox-terrain-v2',
  format: 'image/png',
  transparency: 'true',
  maxZoom: 17,
  opacity: 0.5
});


//GEOJSON layer
// var geojsonLayer = new L.GeoJSON.AJAX("datasets/spatial-static_temporal-static/streetlight.geojson");
// geojsonLayer.addTo(map);


var overlayMaps = {
  "<i class='fa fa-lightbulb-o'></i> <span style='background-color: #579A5D'>StreetLights</span>": streetlightsTile,
  "<i class='fa fa-lightbulb-o'></i> <span style='background-color: yellow'>Contors</span>": contorsTile
  // "geojsonLayer": geojsonLayer
};

//** Construct the map **\\
var map = L.map('mapid', {
  center: [42.3601, -71.0589],
  zoom: 12,
  layers: [darkView,streetlightsTile]
});

//** Controls **\\
// Layers control
L.control.layers(baseMaps, overlayMaps).addTo(map);


// Information button
var informationContent = '<p>Hello world!<br />This is a nice popup.</p>';
var informationPopup = L.popup().setContent(informationContent);
L.easyButton('fa-info-circle fa-lg', function(btn, map){
    informationPopup.setLatLng(map.getCenter()).openOn(map);
}).addTo(map);
