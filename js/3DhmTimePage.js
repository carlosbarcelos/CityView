mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2lqbmpqazdlMDBsdnRva284cWd3bm11byJ9.V6Hg2oYJwMAxeoR9GEzkAA';
// This adds the map to your page
var map = new mapboxgl.Map({
  container: 'map', // container id specified in the HTML
  style: 'mapbox://styles/mapbox/traffic-night-v2', // style URL
  center: [114.0579, 22.5431], // initial map center in [lon, lat]
  zoom: 12
});
map.on('load', function() {
  var filterHour = ['==', 'Hour', 12];
  var filterDay = ['!=', 'Day', 'Bob'];
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
  map.addLayer({
    id: 'collisions',
    type: 'circle',
    source: {
      type: 'geojson',
      data: 'testing_data000.geojson' // replace this with the url of your own geojson
    },
    paint: {
      'circle-radius': {
        property: 'Speed',
        stops: [
          [0, 3],
          [5, 15]
        ]
      },
      'circle-color': {
        property: 'Speed',
        stops: [
          [0, '#0080FF'],
        [1, '#73B98B'],
        [2, '#FFF300'],
        [3, '#FF9700'],
        [4, '#FF5000'],
        [5, '#FF1000']
        ]
      },
      'circle-opacity': 0.8,
      'circle-blur': 1
    },
    filter: ['all', filterHour, filterDay]
  }, 'admin-2-boundaries-dispute'); // place the layer beneath this layer in the basemap
  document.getElementById('slider').addEventListener('input', function(e) {
    // get the current hour as a integer
    var hour = parseInt(e.target.value);
    // map.setFilter(layer-name, filter)
    filterHour = ['==', 'Hour', hour];
    map.setFilter('collisions', ['all', filterHour, filterDay]);
    // converting 0-23 hour to AMPM format
    var ampm = hour >= 12 ? 'PM' : 'AM';
    var hour12 = hour % 12 ? hour % 12 : 12;
    // update text in the UI
    document.getElementById('active-hour').innerText = hour12 + ampm;
  });
  document.getElementById('filters').addEventListener('change', function(e) {
    var day = e.target.value;
    if (day === 'all') {
      // feature[key] exists
      filterDay = ['!=', 'Day', 'Bob'];
    } else if (day === 'weekday') {
      // feature[key] is any of these values
      filterDay = ['!in', 'Day', 'Sat', 'Sun'];
    } else if (day === 'weekend') {
      // feature[key] is not any of these values
      filterDay = ['in', 'Day', 'Sat', 'Sun'];
    } else {
      console.log('error');
    }
    map.setFilter('collisions', ['all', filterHour, filterDay]);
  });
});
