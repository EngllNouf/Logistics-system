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
btn.onclick = function(event) {
  // Prevent the default behavior (showing alert) when the form is valid
  event.preventDefault();

  // Validate the form before opening the modal
  if (validateForm()) {
    modal1.style.display = "block";
  } else {
    modal1.style.display = "none";
  }
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

// When the user clicks on confirm button, close the FIRST modal and open the SECOND modal
acceptConfirmbtn.onclick = function() {
  modal1.style.display = "none";
  modal2.style.display = "block";
}

// Function to validate the form
function validateForm() {


   // Validate Owner Name
   var ownerName = document.getElementById('Owner').value.trim();
   if (ownerName == '') {
     alert('Please enter the owner name.');
     return false;
   }
 
  // Validate Owner ID
  var ownerId = document.getElementById('OwnerID').value.trim();
  if (ownerId == '') {
    alert('Please enter the owner ID.');
    return false;
  }
  if (ownerId.length !== 10 || isNaN(ownerId)) {
    alert('Invalid owner ID. Please enter a valid 10-digit number.');
    return false;
  }

  // Validate User ID
  var userId = document.getElementById('UserID').value.trim();
  if (userId !== '' && (isNaN(userId) || userId.length !== 10)) {
    alert('Invalid user ID. Please enter a valid 10-digit number.');
    return false;
  }

  // Validate License Plate
  var licensePlate = document.getElementById('LicensePlate').value.trim();
  var licensePlatePattern = /^[0-9]{4} [A-Za-z]{3}$/;
  if (!licensePlatePattern.test(licensePlate)) {
    alert('Invalid license plate number. Please enter a valid 4-digit number followed by 3 letters.');
    return false;
  }

  // Validate Vehicle Chassis
  var vehicleChassis = document.getElementById('VehicleChassis').value.trim();
  if (vehicleChassis.length !== 17) {
    alert('Invalid vehicle chassis number. Please enter a valid 17-character number.');
    return false;
  }

  // Validate Insurance Dates
  var insuranceStart = new Date(document.getElementById('insurance_start').value);
  var insuranceEnd = new Date(document.getElementById('insurance_end').value);
  if (isNaN(insuranceStart.getTime()) || isNaN(insuranceEnd.getTime()) || insuranceStart >= insuranceEnd) {
    alert('Invalid insurance dates. Please ensure the start date is before the end date.');
    return false;
  }

  // Validate Inspection Dates
  var inspectionStart = new Date(document.getElementById('inspection_start').value);
  var inspectionEnd = new Date(document.getElementById('inspection_end').value);
  if (isNaN(inspectionStart.getTime()) || isNaN(inspectionEnd.getTime()) || inspectionStart >= inspectionEnd) {
    alert('Invalid inspection dates. Please ensure the start date is before the end date.');
    return false;
  }

  // If all validations pass, return true
  return true;
}

// Event delegation to handle close button clicks
document.addEventListener('click', function(event) {
  if (event.target && event.target.className === 'close') {
    const modal = event.target.closest('.modal');
    modal.style.display = 'none';
  }
});
