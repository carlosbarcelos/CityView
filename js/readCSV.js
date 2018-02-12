function parseStreetlight(){
  d3.csv("../datasets/spatial-static_temporal-static/streetlight-locations.csv", function(d) {
    return {
      lat: d.lat,
      lon: d.lon
    };
  }, function(data) {
    console.log(data);
  });
};
