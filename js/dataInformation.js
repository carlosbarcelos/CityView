/* Populate the modal popup with the correct image and caption */
// Used for Static Data pane
function onClick1(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  document.getElementById("caption01").innerHTML = element.alt;
}

// Used for Time Series Data pane
function onClick2(element) {
  document.getElementById("img02").src = element.src;
  document.getElementById("modal02").style.display = "block";
  document.getElementById("caption02").innerHTML = element.alt;
}

// Used for Dynamic Data pane
function onClick3(element) {
  document.getElementById("img03").src = element.src;
  document.getElementById("modal03").style.display = "block";
  document.getElementById("caption03").innerHTML = element.alt;
}
