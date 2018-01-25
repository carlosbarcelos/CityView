/* Select the map based on the radio button selected. Will change URL based on selection. */
$(document).on('change', '#button_options input:radio:checked', function (event) {
  // Find and switch based on the button
  var selection = event.target.id

  if(selection == "pickup"){
    document.getElementById("carto_map").src = "https://surv-mqp.carto.com/builder/7e2ab3b5-a760-4a9d-bc9c-5dba99364757/embed";
  } else if(selection == "dropoff"){
    document.getElementById("carto_map").src = "https://surv-mqp.carto.com/builder/00e78f51-5113-48c1-a89d-670a50ff2603/embed";
  } else if(selection == "pickup_dropoff"){
    document.getElementById("carto_map").src = "https://surv-mqp.carto.com/builder/de212310-b737-440f-853a-6bdefd0506eb/embed"
  } else{
    console.log("Error");
  }
});
