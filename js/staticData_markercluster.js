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
  zoom: 12,
  layers: [lightView]
  // layers: [lightView,streetlightsTile,bikestationsTile]
});

//** Markerclusters **//
// HELPER: Get (lat,lon) for specific point
function getLatLon(i, latList, lonList) {
  return [
    latList[i],
    lonList[i]
  ];
};

//Streeetlight marker cluster
var streetlightCluster = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
    return L.divIcon({ html: '<div><span>' + cluster.getChildCount() + '</div></span>', className: 'marker-cluster streetlight-cluster', iconSize: L.point(40, 40) });
    // return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
  },
  spiderfyOnMaxZoom: false, // disable spiderfy
  disableClusteringAtZoom: 16, // at this zoom level and below, markers will not be clustered
  maxClusterRadius: 70 // < default (80) makes more, smaller clusters
});
function addStreetlightLayer(){
  // Get dataLength, lat, lon
  var streetlightArray = getStreetlights();
  var dataLength = streetlightArray[0];
  var latList = streetlightArray[1];
  var lonList = streetlightArray[2];

  // Add markers to cluster group
  var streetlightMarkerList = [];
  for (var i = 0; i < dataLength; i++) {
    var marker = L.circleMarker(getLatLon(i, latList, lonList), {
      radius: 2,
      color: '#b5ba27',
      opacity: 0.75
    });
    streetlightMarkerList.push(marker);
  }

  streetlightCluster.addLayers(streetlightMarkerList);
  map.addLayer(streetlightCluster);
};

//Bike station canvas
var bikestationCluster = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
    return L.divIcon({ html: '<div><span>' + cluster.getChildCount() + '</div></span>', className: 'marker-cluster bikestation-cluster', iconSize: L.point(40, 40) });
    // return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
  },
  spiderfyOnMaxZoom: false, // disable spiderfy
  disableClusteringAtZoom: 14, // at this zoom level and below, markers will not be clustered
  maxClusterRadius: 70 // < default (80) makes more, smaller clusters
});
function addBikeStationLayer(){
  // Get dataLength, lat, lon
  var bikeStationArray = getHubwayStations();
  var dataLength = bikeStationArray[0];
  var latList = bikeStationArray[1];
  var lonList = bikeStationArray[2];

  // Add markers to cluster group
  var bikestationMarkerList = [];
  for (var i = 0; i < dataLength; i++) {
    var marker = L.circleMarker(getLatLon(i, latList, lonList), {
      radius: 5,
      color: '#075aff'
    });
    bikestationMarkerList.push(marker);
  }

  bikestationCluster.addLayers(bikestationMarkerList);
  map.addLayer(bikestationCluster);
};

var overlayMaps = {
  "<i class='fa fa-lightbulb-o'></i> <span style='color: #b5ba27'>Street Lights</span>": streetlightCluster,
  "<i class='fa fa-bicycle'></i> <span style='color: #075aff'>Hubway Bike Stations</span>": bikestationCluster
};

//** Controls **\\
// Layers control
L.control.layers(baseMaps, overlayMaps, {position: 'topleft', collapsed:false}).addTo(map);

// Information button
var informationContent = `<p>This interaction is comprised of two datasets: streetlight locations and Hubway bike stations.</br>
It is interesting to note the placement of bike stations and note that they tend to occur near streetlights.</p>`;
var informationPopup = L.popup().setContent(informationContent);
L.easyButton('fa-info-circle fa-lg', function(btn, map){
  informationPopup.setLatLng(map.getCenter()).openOn(map);
}).addTo(map);


//** Pre-load canvas layers **\\
setTimeout(function(){
  addStreetlightLayer();
  addBikeStationLayer();
}, 1000);
