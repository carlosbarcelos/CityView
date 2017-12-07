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
var monday_recycleTile = L.tileLayer('https://api.tiles.mapbox.com/v4/surv-mqp.asq2dowm/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'RecyclingMonday-cpj0mg',
  format: 'image/png',
  type: 'raster',
  attribution: 'Waste Schedule Data © <a href="https://data.boston.gov/">Analyze Boston</a>',
  transparent: true,
  maxZoom: 17,
  opacity: 0.5
});

var tuesday_recycleTile = L.tileLayer('https://api.tiles.mapbox.com/v4/surv-mqp.3chr4167/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'RecyclingTuesday-194h75',
  format: 'image/png',
  type: 'raster',
  attribution: 'Waste Schedule Data © <a href="https://data.boston.gov/">Analyze Boston</a>',
  transparent: true,
  maxZoom: 17,
  opacity: 0.5
});

var wednesday_recycleTile = L.tileLayer('https://api.tiles.mapbox.com/v4/surv-mqp.cik36us1/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'RecyclingWednesday-792mo0',
  format: 'image/png',
  type: 'raster',
  attribution: 'Waste Schedule Data © <a href="https://data.boston.gov/">Analyze Boston</a>',
  transparent: true,
  maxZoom: 17,
  opacity: 0.5
});

var thursday_recycleTile = L.tileLayer('https://api.tiles.mapbox.com/v4/surv-mqp.4tm7g9jf/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'RecyclingThursday-34gtcb',
  format: 'image/png',
  type: 'raster',
  attribution: 'Waste Schedule Data © <a href="https://data.boston.gov/">Analyze Boston</a>',
  transparent: true,
  maxZoom: 17,
  opacity: 0.5
});

var friday_recycleTile = L.tileLayer('https://api.tiles.mapbox.com/v4/surv-mqp.7k6h0q88/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g', {
  layers: 'RecyclingFriday-58cxoc',
  format: 'image/png',
  type: 'raster',
  attribution: 'Waste Schedule Data © <a href="https://data.boston.gov/">Analyze Boston</a>',
  transparent: true,
  maxZoom: 17,
  opacity: 0.5
});

var overlayMaps = {
  "<i class='fa fa-recycle'></i> <span style='background-color: #A2A2AB'>Monday Recycling</span>": monday_recycleTile,
  "<i class='fa fa-recycle'></i> <span style='background-color: #F1A2A7'>Tuesday Recycling</span>": tuesday_recycleTile,
  "<i class='fa fa-recycle'></i> <span style='background-color: #E8A4C4'>Wednesday Recycling</span>": wednesday_recycleTile,
  "<i class='fa fa-recycle'></i> <span style='background-color: #C3E5ED'>Thursday Recycling</span>": thursday_recycleTile,
  "<i class='fa fa-recycle'></i> <span style='background-color: #E29EC8'>Friday Recycling</span>": friday_recycleTile
};

//** Construct the map **\\
var map = L.map('mapid', {
  center: [42.3601, -71.0589],
  zoom: 12,
  layers: [streetView,monday_recycleTile]
});

//** Controls **\\
// Layers control
L.control.layers(baseMaps, overlayMaps).addTo(map);

// Information button
var informationContent = `<p>This interaction is comprised of five datasets: recycling schedule over each weekday.</br>
                          Use the play button to cycle through each day to view how the recycling schedule changes over time.</p>`;
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
var MAX_COUNT = 4;

// monday_recycleTile
// tuesday_recycleTile
// wednesday_recycleTile
// thursday_recycleTile
// friday_recycleTile

function timedCount(){
  switch(c){
    case 0: // Monday Recycling
    monday_recycleTile.removeFrom(map);
    tuesday_recycleTile.removeFrom(map);
    wednesday_recycleTile.removeFrom(map);
    thursday_recycleTile.removeFrom(map);
    friday_recycleTile.removeFrom(map);
    monday_recycleTile.addTo(map);
    console.log('Moday');
    break;
    case 1: // Tuesday Recycling
    monday_recycleTile.removeFrom(map);
    tuesday_recycleTile.addTo(map);
    console.log('Tuesday');
    break;
    case 2: // Wednesday Recycling
    tuesday_recycleTile.removeFrom(map);
    wednesday_recycleTile.addTo(map);
    console.log('Wednesday');
    break;
    case 3: // Thursday Recycling
    wednesday_recycleTile.removeFrom(map);
    thursday_recycleTile.addTo(map);
    console.log('Thursday');
    break;
    case 4: // Friday Recycling
    thursday_recycleTile.removeFrom(map);
    friday_recycleTile.addTo(map);
    console.log('Friday');
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
