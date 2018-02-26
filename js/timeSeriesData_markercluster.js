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
  center: [42.3601, -71.0589],
  zoom: 12,
  layers: [lightView]
});

//** Markerclusters **//
//NOTE: Day of week is available by playing .bindPopup(day) directly after .addTo(map)
//      However this causes MASSIVE slowdown on map and is not recommended

// HELPER: Get (lat,lon) for specific point
function getLatLon(i, latList, lonList) {
  return [
    latList[i],
    lonList[i]
  ];
};

//Monday Recycling
var mondayRecyclingCluster = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
    return L.divIcon({ html: '<div><span>' + cluster.getChildCount() + '</div></span>', className: 'marker-cluster recyclingMonday-cluster', iconSize: L.point(40, 40) });
    // return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
  },
  spiderfyOnMaxZoom: false, // disable spiderfy
  disableClusteringAtZoom: 18, // at this zoom level and below, markers will not be clustered
  maxClusterRadius: 70 // < default (80) makes more, smaller clusters
});
function addMondayRecycling(){
  // Get dataLength, lat, lon
  var mondayRecyclingArray = getMondayRecycling();
  var dataLength = mondayRecyclingArray[0];
  var latList = mondayRecyclingArray[1];
  var lonList = mondayRecyclingArray[2];
  var day = mondayRecyclingArray[3];

  // Add markers to cluster group
  var markerList = [];
  for (var i = 0; i < dataLength; i++) {
    var marker = L.circleMarker(getLatLon(i, latList, lonList), {
      radius: 2,
      color: '#E74C3C'
    });
    markerList.push(marker);
  }

  mondayRecyclingCluster.addLayers(markerList);
  map.addLayer(mondayRecyclingCluster);
};

//Tuesday Recycling
var tuesdayRecyclingCluster = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
    return L.divIcon({ html: '<div><span>' + cluster.getChildCount() + '</div></span>', className: 'marker-cluster recyclingTuesday-cluster', iconSize: L.point(40, 40) });
    // return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
  },
  spiderfyOnMaxZoom: false, // disable spiderfy
  disableClusteringAtZoom: 18, // at this zoom level and below, markers will not be clustered
  maxClusterRadius: 70 // < default (80) makes more, smaller clusters
});
function addTuesdayRecycling(){
  // Get dataLength, lat, lon
  var tuesdayRecyclingArray = getTuesdayRecycling();
  var dataLength = tuesdayRecyclingArray[0];
  var latList = tuesdayRecyclingArray[1];
  var lonList = tuesdayRecyclingArray[2];

  // Add markers to cluster group
  var markerList = [];
  for (var i = 0; i < dataLength; i++) {
    var marker = L.circleMarker(getLatLon(i, latList, lonList), {
      radius: 2,
      color: '#E67E22'
    });
    markerList.push(marker);
  }

  tuesdayRecyclingCluster.addLayers(markerList);
  map.addLayer(tuesdayRecyclingCluster);
};

//Wednesday Recycling
var wednesdayRecyclingCluster = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
    return L.divIcon({ html: '<div><span>' + cluster.getChildCount() + '</div></span>', className: 'marker-cluster recyclingWednesday-cluster', iconSize: L.point(40, 40) });
    // return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
  },
  spiderfyOnMaxZoom: false, // disable spiderfy
  disableClusteringAtZoom: 18, // at this zoom level and below, markers will not be clustered
  maxClusterRadius: 70 // < default (80) makes more, smaller clusters
});
function addWednesdayRecycling(){
  // Get dataLength, lat, lon
  var wednesdayRecyclingArray = getWednesdayRecycling();
  var dataLength = wednesdayRecyclingArray[0];
  var latList = wednesdayRecyclingArray[1];
  var lonList = wednesdayRecyclingArray[2];

  // Add markers to cluster group
  var markerList = [];
  for (var i = 0; i < dataLength; i++) {
    var marker = L.circleMarker(getLatLon(i, latList, lonList), {
      radius: 2,
      color: '#2ECC71'
    });
    markerList.push(marker);
  }

  wednesdayRecyclingCluster.addLayers(markerList);
  map.addLayer(wednesdayRecyclingCluster);
};

//Thursday Recycling
var thursdayRecyclingCluster = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
    return L.divIcon({ html: '<div><span>' + cluster.getChildCount() + '</div></span>', className: 'marker-cluster recyclingThursday-cluster', iconSize: L.point(40, 40) });
    // return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
  },
  spiderfyOnMaxZoom: false, // disable spiderfy
  disableClusteringAtZoom: 18, // at this zoom level and below, markers will not be clustered
  maxClusterRadius: 70 // < default (80) makes more, smaller clusters
});
function addThursdayRecycling(){
  // Get dataLength, lat, lon
  var thursdayRecyclingArray = getThursdayRecycling();
  var dataLength = thursdayRecyclingArray[0];
  var latList = thursdayRecyclingArray[1];
  var lonList = thursdayRecyclingArray[2];

  // Add markers to cluster group
  var markerList = [];
  for (var i = 0; i < dataLength; i++) {
    var marker = L.circleMarker(getLatLon(i, latList, lonList), {
      radius: 2,
      color: '#3498DB'
    });
    markerList.push(marker);
  }

  thursdayRecyclingCluster.addLayers(markerList);
  map.addLayer(thursdayRecyclingCluster);
};

//Friday Recycling
var fridayRecyclingCluster = L.markerClusterGroup({
  iconCreateFunction: function(cluster) {
    return L.divIcon({ html: '<div><span>' + cluster.getChildCount() + '</div></span>', className: 'marker-cluster recyclingFriday-cluster', iconSize: L.point(40, 40) });
    // return L.divIcon({ html: '<b>' + cluster.getChildCount() + '</b>' });
  },
  spiderfyOnMaxZoom: false, // disable spiderfy
  disableClusteringAtZoom: 18, // at this zoom level and below, markers will not be clustered
  maxClusterRadius: 70 // < default (80) makes more, smaller clusters
});
function addFridayRecycling(){
  // Get dataLength, lat, lon
  var fridayRecyclingArray = getFridayRecycling();
  var dataLength = fridayRecyclingArray[0];
  var latList = fridayRecyclingArray[1];
  var lonList = fridayRecyclingArray[2];

  // Add markers to cluster group
  var markerList = [];
  for (var i = 0; i < dataLength; i++) {
    var marker = L.circleMarker(getLatLon(i, latList, lonList), {
      radius: 2,
      color: '#9B59B6'
    });
    markerList.push(marker);
  }

  fridayRecyclingCluster.addLayers(markerList);
  map.addLayer(fridayRecyclingCluster);
};

var overlayMaps = {
  "<i class='fa fa-recycle'></i> <span style='color: #E74C3C'>Monday Recycling</span>": mondayRecyclingCluster,
  "<i class='fa fa-recycle'></i> <span style='color: #E67E22'>Tuesday Recycling</span>": tuesdayRecyclingCluster,
  "<i class='fa fa-recycle'></i> <span style='color: #2ECC71'>Wednesday Recycling</span>": wednesdayRecyclingCluster,
  "<i class='fa fa-recycle'></i> <span style='color: #3498DB'>Thursday Recycling</span>": thursdayRecyclingCluster,
  "<i class='fa fa-recycle'></i> <span style='color: #9B59B6'>Friday Recycling</span>": fridayRecyclingCluster
};

//** Controls **\\
// Layers control
L.control.layers(baseMaps, overlayMaps, {position: 'topleft',collapsed:false}).addTo(map);

// Information button
var informationContent = `<p>This interaction is comprised of five datasets: recycling schedule over each weekday.</br>
Use the play button to cycle through each day to view how the recycling schedule changes over time.</p>`;
var informationPopup = L.popup().setContent(informationContent);
L.easyButton('fa-info-circle fa-lg', function(btn, map){
  informationPopup.setLatLng(map.getCenter()).openOn(map);
}).addTo(map);

//** Automatic Carousel **\\
// Create the play button to be added to the map to activate carousel
playCarouselButton = L.easyButton({
  id: 'stop-carousel',
  position: 'topleft',
  type: 'replace',
  leafletClasses: true,
  states:[{
    stateName: 'get-center',
    onClick: function(button, map){
      resetCount(); // start from the begining
      doTimer(); // start the cycle
      playCarouselButton.removeFrom(map);
      stopCarouselButton.addTo(map);
    },
    title: 'Start the carousel',
    icon: 'fa fa-play'
  }]
}).addTo(map);

// Create the stop button to be added to the map to deactivate carousel
stopCarouselButton = L.easyButton({
  id: 'stop-carousel',
  position: 'topleft',
  type: 'replace',
  leafletClasses: true,
  states:[{
    stateName: 'get-center',
    onClick: function(button, map){
      stopCount(); // end the cycle
      display_panel.remove();
      stopCarouselButton.removeFrom(map);
      playCarouselButton.addTo(map);
    },
    title: 'Stop the carousel',
    icon: 'fa fa-stop'
  }]
});

var c=0; // counter
var t; // timer
var timer_is_on=0; // timer status flag
var MAX_COUNT = 4; // days in the week

// Iterate over the days of the week, display the appropriate layer
function timedCount(){
  switch(c){
    case 0: // Monday Recycling
    DoW = 'Moday';
    mondayRecyclingCluster.addTo(map);
    fridayRecyclingCluster.removeFrom(map);
    break;
    case 1: // Tuesday Recycling
    DoW = 'Tuesday';
    tuesdayRecyclingCluster.addTo(map);
    mondayRecyclingCluster.removeFrom(map);
    break;
    case 2: // Wednesday Recycling
    DoW = 'Wednesday';
    wednesdayRecyclingCluster.addTo(map);
    tuesdayRecyclingCluster.removeFrom(map);
    break;
    case 3: // Thursday Recycling
    DoW = 'Thursday';
    thursdayRecyclingCluster.addTo(map);
    wednesdayRecyclingCluster.removeFrom(map);
    break;
    case 4: // Friday Recycling
    DoW = 'Friday';
    fridayRecyclingCluster.addTo(map);
    thursdayRecyclingCluster.removeFrom(map);
    break;
  }
  t=setTimeout("timedCount()",1000);
  // go to next count. If max, start again
  if(c == MAX_COUNT){
    c = 0
  } else{
    c += 1;
  }
  // update day of week display
  document.getElementById("DoW").innerHTML = DoW;
}

// Start the carousel
function doTimer(){
  //Start clean
  display_panel.addTo(map);
  mondayRecyclingCluster.removeFrom(map);
  tuesdayRecyclingCluster.removeFrom(map);
  wednesdayRecyclingCluster.removeFrom(map);
  thursdayRecyclingCluster.removeFrom(map);
  fridayRecyclingCluster.removeFrom(map);
  if (!timer_is_on){
    timer_is_on=1;
    timedCount();
  }
}

// End the carousel
function stopCount(){
  clearTimeout(t);
  timer_is_on=0;
}

// Reset the counter
function resetCount(){
  c=0;
}

//** Day of Week Text**\\
L.Control.textbox = L.Control.extend({
  onAdd: function(map) {
    var div = L.DomUtil.create('div', 'display-panel');
    div.innerHTML = "Day of Week";
    div.id = 'DoW';
    return div;
  },
  onRemove: function(map) {}
});

// Add day of week display
L.control.textbox = function(opts) {
  return new L.Control.textbox(opts);
}
var display_panel = L.control.textbox({ position: 'topright' });

//** Legend **//
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
  grades = ["Moday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  labels = ["../images/legend/legend-mondayRecycle.png","../images/legend/legend-tuesdayRecycle.png", "../images/legend/legend-wednesdayRecycle.png",
  "../images/legend/legend-thursdayRecycle.png","../images/legend/legend-fridayRecycle.png"];
  div.innerHTML += "<h4>Legend</h4>"
  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
    (" <img src="+ labels[i] +">") + "&#09" + grades[i] +'<br><br>';
  }
  return div;
};
legend.addTo(map);

//** Pre-load Cluster layers **\\
setTimeout(function(){
  addMondayRecycling();
  addTuesdayRecycling();
  addWednesdayRecycling();
  addThursdayRecycling();
  addFridayRecycling();
}, 1000); // Delay to allow page to load
