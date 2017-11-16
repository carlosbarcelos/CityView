mapboxgl.accessToken = 'pk.eyJ1IjoiY2h1YWNvbiIsImEiOiJjajRlOXljb2cwMTd3MnhsYXQ4NnY0dXR0In0.GZ2wwLLO4yd_1PoQrNG-UA';
var map, layerList, inputs
map = new mapboxgl.Map({
  container: 'map',
  //style: 'mapbox://styles/mapbox/dark-v9',
  style: 'mapbox://styles/chuacon/cj4ud2suu03m82smmv58rs917',
  center: [114.0579, 22.5431],
  zoom: 8,
  pitch: 0,
  bearing: 0,
  });
  document.getElementById('listing-group').addEventListener('change', function(e) {
    var handler = e.target.id;
    if (e.target.checked) {
      map[handler].enable();
      } else {
        map[handler].disable();
      }
  });
   map.on('load', function() {
  map.addLayer({
    'id': '3d-buildings',
    'source': 'composite',
    'source-layer': 'building',
    'filter': ['==', 'extrude', 'true'],
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
      'fill-extrusion-height': {
        'type': 'identity',
        'property': 'height'
        },
        'fill-extrusion-base': {
          'type': 'identity',
          'property': 'min_height'
          },
          'fill-extrusion-opacity': .6
          }
    });
// Add a new source from our GeoJSON data and set the
// 'cluster' option to true.
map.addSource("long_and_lat", {
    type: "geojson",
    // Point to GeoJSON data. This example visualizes Taxi GPS Data in Shenzhen, China
    // for three days from 10/22/2103 - 10/24/2013 as logged by Desheng Zhang |Assistant Professor|Department of Computer Science|Rutgers University|
    // https://www.cs.rutgers.edu/~dz220/data.html
    // The data from https://www.cs.rutgers.edu/~dz220/data.html was used and converted from csv to geojson using a python script
    data: "testing_data000.geojson", // Make sure to use "https" if loading the page with https.
    cluster: true,
    //clusterMaxZoom: 15, // Max zoom to cluster points on
    clusterRadius: 8 // Use small cluster radius for the heatmap look
});
// Use the long_and_lat source to create four layers:
// three for each cluster category, and one for unclustered points
// Each point range gets a different fill color.
var layers = [
    [0, '#404387'],
    [10, '#29788E'],
    [30, '#22A784'],
    [40, '#79D151'],
    [50, '#FDE724'],
    //[100, '#FBFCBF']
];
layers.forEach(function (layer, i) {
    map.addLayer({
        "id": "cluster-" + i,
        "type": "circle",
        "source": "long_and_lat",
        "paint": {
            "circle-color": layer[1],
            "circle-radius": 50,
            "circle-blur": 1 // blur the circles to get a heatmap look
        },
        "filter": i === layers.length - 1 ?
            [">=", "point_count", layer[0]] :
            ["all",
                [">=", "point_count", layer[0]],
                ["<", "point_count", layers[i + 1][0]]]
    }, 'waterway-label');
    });
map.addLayer({
    "id": "unclustered-points",
    "type": "circle",
    "source": "long_and_lat",
    "paint": {
        "circle-color": '#404387',
        "circle-radius": 20,
        "circle-blur": 1
    },
    "filter": ["!=", "cluster", true]
}, 'waterway-label');
});
