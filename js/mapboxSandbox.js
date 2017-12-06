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

  // Monday Recycling Layer
  map.addSource('recycling-monday', {
      type: 'vector',
      url: 'mapbox://surv-mqp.asq2dowm'
  });
  map.addLayer({
    'id': 'recycling-monday',
    'type': 'circle',
    'source': 'recycling-monday',
    'source-layer': 'RecyclingMonday-cpj0mg',
    'layout': {
      'visibility': 'visible'
    },
    'paint': {
      'circle-radius': 4,
      'circle-color': 'rgba(0,179,179,.5)'
    }
  });

  //  Tuesday Recycling Layer
  map.addSource('recycling-tuesday', {
      type: 'vector',
      url: 'mapbox://surv-mqp.3chr4167'
  });
  map.addLayer({
    'id': 'recycling-tuesday',
    'type': 'circle',
    'source': 'recycling-tuesday',
    'source-layer': 'RecyclingTuesday-194h75',
    'layout': {
      'visibility': 'visible'
    },
    'paint': {
      'circle-radius': 4,
      'circle-color': 'rgba(38,153,0,.5)'
    }
  });

  // Wednesday Recycling Layer
  map.addSource('recycling-wednesday', {
      type: 'vector',
      url: 'mapbox://surv-mqp.cik36us1'
  });
  map.addLayer({
    'id': 'recycling-wednesday',
    'type': 'circle',
    'source': 'recycling-wednesday',
    'source-layer': 'RecyclingWednesday-792mo0',
    'layout': {
      'visibility': 'visible'
    },
    'paint': {
      'circle-radius': 4,
      'circle-color': 'rgba(89,0,179,.5)'
    }
  });

  // Thursday Recycling Layer
  map.addSource('recycling-thursday', {
      type: 'vector',
      url: 'mapbox://surv-mqp.4tm7g9jf'
  });
  map.addLayer({
    'id': 'recycling-thursday',
    'type': 'circle',
    'source': 'recycling-thursday',
    'source-layer': 'RecyclingThursday-34gtcb',
    'layout': {
      'visibility': 'visible'
    },
    'paint': {
      'circle-radius': 4,
      'circle-color': 'rgba(230,115,0,.5)'
    }
  });

  // Friday Recycling Layer
  map.addSource('recycling-friday', {
      type: 'vector',
      url: 'mapbox://surv-mqp.7k6h0q88'
  });
  map.addLayer({
    'id': 'recycling-friday',
    'type': 'circle',
    'source': 'recycling-friday',
    'source-layer': 'RecyclingFriday-58cxoc',
    'layout': {
      'visibility': 'visible'
    },
    'paint': {
      'circle-radius': 4,
      'circle-color': 'rgba(204,0,0,.5)'
    }
  });
})

var toggleableLayerIds = [ 'contours', 'streetlights', 'recycling-monday', 'recycling-tuesday', 'recycling-wednesday', 'recycling-thursday', 'recycling-friday'];

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


//*** Features / Options ***\\
//Zoom Control
map.addControl(new mapboxgl.NavigationControl(), 'top-left');
map.addControl(new mapboxgl.FullscreenControl(), 'top-left');
//Information controls
class InformationControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('button');
        this._container.className = 'mapboxgl-ctrl InformationControl';
        this._container.title = 'Get information about the significance of this dataset.';
        this._container.textContent = '?';
        return this._container;
    }
}
map.addControl(new InformationControl(), 'top-left');
var informationClass = document.getElementsByClassName("InformationControl");
var informationControlFunction = function() {
    alert('Information Control.');
};
informationClass[0].addEventListener('click', informationControlFunction, false);
//Style Control
class StyleControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('button');
        this._container.className = 'mapboxgl-ctrl StyleControl';
        this._container.title = 'Change the style of the map.';
        this._container.textContent = 'S';
        return this._container;
    }
}
map.addControl(new StyleControl(), 'top-left');
var styleClass = document.getElementsByClassName("StyleControl");
var styleControlFunction = function() {
  map.setStyle('mapbox://styles/mapbox/streets-v9');

};
styleClass[0].addEventListener('click', styleControlFunction, false);
