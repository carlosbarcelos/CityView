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
      'circle-color': 'rgba(208,208,112,.5)'
    }
  });

  // Trash Schedule Layer
  map.addSource('trashschedule', {
      type: "vector",
      url: "mapbox://surv-mqp.3ho0uq0o"
  });

  map.addLayer({
      "id": "trashschedule-heat",
      "type": "heatmap",
      "source": "trashschedule",
      'source-layer': 'trash-schedules-by-address-6lkr3h',
      "maxzoom": 9,
      "paint": {
          //Increase the heatmap weight based on frequency and property magnitude
          "heatmap-weight": {
              "property": "mag",
              "type": "exponential",
              "stops": [
                  [0, 0],
                  [6, 1]
              ]
          },
          //Increase the heatmap color weight weight by zoom level
          //heatmap-ntensity is a multiplier on top of heatmap-weight
          "heatmap-intensity": {
              "stops": [
                  [0, 1],
                  [9, 3]
              ]
          },
          //Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
          //Begin color ramp at 0-stop with a 0-transparancy color
          //to create a blur-like effect.
          "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0, "rgba(33,102,172,0)",
              0.2, "rgb(103,169,207)",
              0.4, "rgb(209,229,240)",
              0.6, "rgb(253,219,199)",
              0.8, "rgb(239,138,98)",
              1, "rgb(178,24,43)"
          ],
          //Adjust the heatmap radius by zoom level
          "heatmap-radius": {
              "stops": [
                  [0, 2],
                  [9, 20]
              ]
          },
          //Transition from heatmap to circle layer by zoom level
          "heatmap-opacity": {
              "default": 1,
              "stops": [
                  [7, 1],
                  [9, 0]
              ]
          },
      }
  }, 'waterway-label');

  map.addLayer({
      "id": "trashschedule-point",
      "type": "circle",
      "source": "trashschedule",
      'source-layer': 'trash-schedules-by-address-6lkr3h',
      "minzoom": 7,
      "paint": {
          //Size circle raidus by earthquake magnitude and zoom level
          "circle-radius": {
              "property": "mag",
              "type": "exponential",
              "stops": [
                  [{ zoom: 7, value: 1 }, 1],
                  [{ zoom: 7, value: 6 }, 4],
                  [{ zoom: 16, value: 1 }, 5],
                  [{ zoom: 16, value: 6 }, 50],
              ]
          },
          //Color circle by earthquake magnitude
          "circle-color": {
              "property": "Trash",
              "type": "exponential",
              "stops": [
                  ['M', "rgba(33,102,172,0)"],
                  ['T', "rgb(103,169,207)"],
                  ['W', "rgb(209,229,240)"],
                  ['TH', "rgb(253,219,199)"],
                  ['F', "rgb(239,138,98)"],
                  ['St', "rgb(178,24,43)"]
              ]
          },
          "circle-stroke-color": "white",
          "circle-stroke-width": 1,
          //Transition from heatmap to circle layer by zoom level
          "circle-opacity": {
              "stops": [
                  [7, 0],
                  [8, 1]
              ]
          }
      }
  }, 'waterway-label');
});

var toggleableLayerIds = [ 'contours', 'streetlights', 'trashschedule'];

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
