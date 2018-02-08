// Get the modal
// var modal = document.getElementById('myModal');
//
// // Get the image and insert it inside the modal - use its "alt" text as a caption
// var img = document.getElementById('myImg');
// var modalImg = document.getElementById("img01");
// var captionText = document.getElementById("caption");
// img.onclick = function(){
//     modal.style.display = "block";
//     modalImg.src = this.src;
//     captionText.innerHTML = this.alt;
// }

function onClick1(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  document.getElementById("caption01").innerHTML = "1";
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
