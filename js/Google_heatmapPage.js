  var map, pointarray, heatmap;
  var csv = [];
  // http://stackoverflow.com/a/2901298/562440
  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function handleFileSelect(evt) {
    var file = evt.target.files[0];
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        csv = [];
        if(results.meta.fields.indexOf("weight") == -1) {
          for(idx in results["data"]) {
            var row = results["data"][idx];
            csv.push(new google.maps.LatLng(row["lat"], row["lon"]))
          }
        } else {
          var max = results["data"][0]["weight"];
          for(idx in results["data"]) {
            var row = results["data"][idx];
            max = Math.max(max, row["weight"]);
            csv.push({
              location: new google.maps.LatLng(row["lat"], row["lon"]),
              weight: row["weight"]
            });
          }
          $("#max-label").html("max: "+numberWithCommas(max));
          $("#max-slider").slider("option","max",max);
          $("#max-slider").slider("option","value",max);
        }
        console.log(results);
        loadHeatmap(csv);
      }
    });
  }
  function initialize() {
    var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(22.5431, 114.0579),
    mapTypeId: google.maps.MapTypeId.hybrid
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  }
  function loadHeatmap(csv) {
    var pointArray = new google.maps.MVCArray(csv);

    if(heatmap) heatmap.setMap(null);
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: pointArray,
      radius: $("#radius-slider").slider("value"),
      opacity: $("#opacity-slider").slider("value")
    });
    heatmap.setMap(map);
  }

  $(document).ready(function(){
    $("#csv-file").change(handleFileSelect);
    google.maps.event.addDomListener(window, 'load', initialize);
    $(function() {
      $( "#draggable" ).draggable();
    });
    $(function() {
      $( "#radius-slider" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 1,
        max: 100,
        value: 20,
        slide: function(event, ui) {
          $("#radius-label").html("radius: " + ui.value);
          if(heatmap == null) return;
          heatmap.set('radius', ui.value);
        }
      });

      $( "#opacity-slider" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 100,
        value: 50,
        slide: function(event, ui) {
          $("#opacity-label").html("opacity: " + ui.value/100);
          if(heatmap == null) return;
          heatmap.set('opacity', ui.value/100);
        }
      });
      $( "#max-slider" ).slider({
        orientation: "horizontal",
        range: "min",
        min: 0,
        max: 1,
        value: 0,
        slide: function(event, ui) {
          $("#max-label").html("max: " + numberWithCommas(ui.value));
          if(heatmap == null) return;
          heatmap.set('maxIntensity', ui.value);
        }
      });
    });
  });
