// Call to retrieve map from MapBox
mapboxgl.accessToken = 'pk.eyJ1Ijoic3Vydi1tcXAiLCJhIjoiY2o5eDNxZHRtN3hlMzJxbGcycm1kdjNkbCJ9.KbJcO99y-sr0o_x4zZMF0g';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v9',
  center: [-71.0589, 42.3601],
  zoom: 9
});

// layers
map.on('load', function () {
  // Contours Layer
  map.addSource('contours', {
    type: 'vector',
    url: 'mapbox://mapbox.mapbox-terrain-v2'
  });
  map.addLayer({
    'id': 'contours',
    'type': 'line',
    'source': 'contours',
    'source-layer': 'contour',
    'layout': {
      'visibility': 'visible',
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#877b59',
      'line-width': 1
    }
  });
  // Streetlights layer
  map.addSource('streetlights', {
    type: 'vector',
    url: 'mapbox://surv-mqp.5lmjns02'
  });
  map.addLayer({
    'id': 'streetlights',
    'type': 'circle',
    'source': 'streetlights',
    'source-layer': 'streetlight-locations-8rhrqp',
    'layout': {
      'visibility': 'visible'
    },
    'paint': {
      'circle-radius': 4,
      'circle-color': 'rgba(102,102,0,.5)'
    }
  });
})

var toggleableLayerIds = [ 'contours', 'streetlights'];

for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];

  var link = document.createElement('a');
  link.href = '#';
  link.className = 'active';
  link.textContent = id;

  link.onclick = function (e) {
    var clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

    if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      this.className = '';
    } else {
      this.className = 'active';
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    }
  };

  var layers = document.getElementById('menu');
  layers.appendChild(link);
}