// Get the modal
var modal1 = document.getElementById("myModal");
var modal2 = document.getElementById("mySuccessModal");

// Get the buttons
var btn = document.getElementById("confirm-btn");
var cancelbtn = document.getElementById("cancel");
var acceptConfirmbtn = document.getElementById("acceptConfirm");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("secondClose")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal1.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
  modal1.style.display = "none";
}

span2.onclick = function() {
  modal2.style.display = "none";
}


// When the user clicks on cancel button, close the modal
cancelbtn.onclick = function() {
    modal1.style.display = "none";
}

// When the user clicks on confirm button, close the FIRST modal and open SECOND model
acceptConfirmbtn.onclick = function() {
    modal1.style.display = "none";
    modal2.style.display = "block";
}