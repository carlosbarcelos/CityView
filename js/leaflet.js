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

var overlayMaps = {
  "StreetLights": streetlightsTile
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

// Information control
var informationControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
    container.style.backgroundImage = '<i class="fa fa-linkedin"></i>';
    container.style.backgroundColor = 'white';
    container.style.width = '26px';
    container.style.height = '26px';

    container.onclick = function(){
      console.log('buttonClicked');
    }
    return container;
  },
});
map.addControl(new informationControl());

// Second control
var secondControl =  L.Control.extend({

  options: {
    position: 'topleft'
  },

  onAdd: function (map) {
    var container = L.DomUtil.create('input');
    container.type="button";
    container.title="No cat";
    container.value = "42";
    container.style.width = '26px';
    container.style.height = '26px';
    container.onmouseover = function(){
      container.style.backgroundColor = 'lightgrey';
    }
    container.onmouseout = function(){
      container.style.backgroundColor = 'white';
    }
    container.onclick = function(){
      console.log('buttonClicked');
    }
    return container;
  }
});

map.addControl(new secondControl());

var helloPopup = L.popup().setContent('Hello World!');

L.easyButton('fa-info-circle fa-lg', function(btn, map){
    helloPopup.setLatLng(map.getCenter()).openOn(map);
}).addTo(map);

// //https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets'
// }).addTo(map);
//
// L.tileLayer('https://api.tiles.mapbox.com/v4/surv-mqp.5lmjns02/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
// }).addTo(map);
