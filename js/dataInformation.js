function onClick1(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  document.getElementById("caption01").innerHTML = element.alt;
}

function onClick2(element) {
  document.getElementById("img02").src = element.src;
  document.getElementById("modal02").style.display = "block";
  document.getElementById("caption02").innerHTML = "2";
}

function onClick3(element) {
  document.getElementById("img03").src = element.src;
  document.getElementById("modal03").style.display = "block";
  document.getElementById("caption03").innerHTML = "3";
}
