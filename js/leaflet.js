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
  type: 'raster',
  attribution: 'StreetLight Data © <a href="https://data.boston.gov/">Analyze Boston</a>',
  transparent: true,
  maxZoom: 17,
  opacity: 0.5
});

// var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
// 	layers: 'nexrad-n0r-900913',
// 	format: 'image/png',
// 	transparent: true,
// 	attribution: "Weather data © 2012 IEM Nexrad"
// });

// Contours Layer
var contorsTile = L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.mapbox-terrain-v2/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'mapbox.mapbox-terrain-v2',
  format: 'image/png',
  transparency: 'true',
  maxZoom: 17,
  opacity: 0.5
});

var overlayMaps = {
  "<i class='fa fa-lightbulb-o'></i> <span style='background-color: #579A5D'>StreetLights</span>": streetlightsTile,
  "<i class='fa fa-lightbulb-o'></i> <span style='background-color: yellow'>Contors</span>": contorsTile
  // "geojsonLayer": geojsonLayer
};

//** Construct the map **\\
var map = L.map('mapid', {
  center: [42.3601, -71.0589],
  zoom: 12,
  layers: [streetView,streetlightsTile, contorsTile]
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


//** Automatic Carousel **\\
playCarouselButton = L.easyButton({
  id: 'stop-carousel',
  position: 'topleft',
  type: 'replace',
  leafletClasses: true,
  states:[{
    stateName: 'get-center',
    onClick: function(button, map){
      resetCount();
      doTimer();
      playCarouselButton.removeFrom(map);
      stopCarouselButton.addTo(map);
    },
    title: 'Start the carousel',
    icon: 'fa fa-play'
  }]
}).addTo(map);

stopCarouselButton = L.easyButton({
  id: 'stop-carousel',
  position: 'topleft',
  type: 'replace',
  leafletClasses: true,
  states:[{
    stateName: 'get-center',
    onClick: function(button, map){
      stopCount()
      stopCarouselButton.removeFrom(map);
      playCarouselButton.addTo(map);
    },
    title: 'Stop the carousel',
    icon: 'fa fa-stop'
  }]
});

var c=0;
var t;
var timer_is_on=0;
var MAX_COUNT = 1;


function timedCount(){
  switch(c){
    case 0:
      streetlightsTile.addTo(map);
      contorsTile.removeFrom(map);
      console.log('Lights');
      break;
    case 1:
      contorsTile.addTo(map);
      streetlightsTile.removeFrom(map);
      console.log('Contours');
      break;
  }
  t=setTimeout("timedCount()",1000);
  if(c == MAX_COUNT){
    c = 0
  } else{
    c += 1;
  }
}

function doTimer(){
  if (!timer_is_on){
    timer_is_on=1;
    timedCount();
  }
}

function stopCount(){
  clearTimeout(t);
  timer_is_on=0;
}

function resetCount(){
  c=0
}
