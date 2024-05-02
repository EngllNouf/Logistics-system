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
  // Validate the form before opening the modal
  if (validateForm()) {
    modal1.style.display = "block";
  }
}

// Function to validate the form
function validateForm() {
  // Add validation logic here

  // Function to validate the owner ID
  function validateOwnerID(ownerId) {
    // Check if the owner ID is a number and has 11 digits
    if (isNaN(ownerId) || ownerId.length !== 10) {
      alert('Invalid owner ID. Please enter a valid 10-digit number.');
      return false;
    }
    return true;
  }

  // Function to validate the user ID
  function validateUserID(userId) {
    // Check if the user ID is a number and has 11 digits
    if (isNaN(userId) || userId.length !== 10) {
      alert('Invalid user ID. Please enter a valid 10-digit number.');
      return false;
    }
    return true;
  }

  // Function to validate the license plate number
  function validateLicensePlate(licensePlate) {
    // Check if the license plate matches the pattern 4 digits followed by 3 letters
    const pattern = /^[0-9]{4} [A-Za-z]{3}$/;
    if (!pattern.test(licensePlate)) {
      alert('Invalid license plate number. Please enter a valid 4-digit number followed by 3 letters.');
      return false;
    }
    return true;
  }

  // Function to validate the vehicle chassis number
  function validateVehicleChassis(vehicleChassis) {
    // Check if the vehicle chassis number is 17 characters long
    if (vehicleChassis.length !== 17) {
      alert('Invalid vehicle chassis number. Please enter a valid 17-character number.');
      return false;
    }
    return true;
  }

  // Function to validate the insurance start and end dates
  function validateInsuranceDates(startDate, endDate) {
    // Check if the start date is before the end date
    if (new Date(startDate) > new Date(endDate)) {
      alert('Invalid insurance dates. Please ensure the start date is before the end date.');
      return false;
    }
    return true;
  }

  // Function to validate the inspection start and end dates
  function validateInspectionDates(startDate, endDate) {
    // Check if the start date is before the end date
    if (new Date(startDate) > new Date(endDate)) {
      alert('Invalid inspection dates. Please ensure the start date is before the end date.');
      return false;
    }
    return true;
  }

  // Validate all required fields:
  if (!validateOwnerID(document.getElementById('OwnerID').value)) {
    return false;
  }
  if (!validateUserID(document.getElementById('UserID').value)) {
    return false;
  }
  if (!validateLicensePlate(document.getElementById('LicensePlate').value)) {
    return false;
  }
  if (!validateVehicleChassis(document.getElementById('VehicleChassis').value)) {
    return false;
  }
  if (!validateInsuranceDates(document.getElementById('insurance_start').value, document.getElementById('insurance_end').value)) {
    return false;
  }
  if (!validateInspectionDates(document.getElementById('inspection_start').value, document.getElementById('inspection_end').value)) {
    return false;
  }

  // If all validations pass, return true
  return true;
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

// Event delegation to handle delete button clicks
document.addEventListener('click', function(event) {
  if (event.target && event.target.className === 'formClose') {
    deleteForm(event);
  }
});

// Function to delete a form
function deleteForm(event) {
  // Get the form element
  const form = event.target.closest('form');

  // Remove the form from the DOM
  form.remove();
} 

// Function to validate the owner ID
function validateOwnerID(ownerId) {
  console.log("Validating owner ID:", ownerId); // Add this log
  // Check if the owner ID is a number and has 10 digits
  if (isNaN(ownerId) || ownerId.length !== 10) {
    alert('Invalid owner ID. Please enter a valid 10-digit number.');
    return false;
  }
  return true;
}
