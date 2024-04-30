document.getElementById("addTruck-btn").addEventListener("click", createTruckForm);
document.getElementById("Check").addEventListener("click", enableConfirm);

function createTruckForm() {

    var addFormPlace = document.getElementById('AddForm');
    var formBody = document.querySelector('.formBody');

    addFormPlace.appendChild(formBody.cloneNode(true));
}

function enableConfirm(){

    var check = document.getElementById("Check");
    var confirm = document.getElementById("confirm-btn");

    if(check.checked){
        confirm.removeAttribute("disabled");
    }
    else{
        confirm.disabled = "true";
    }


}

// Function to validate the owner ID
function validateOwnerID(ownerId) {
    // Check if the owner ID is a number and has 11 digits
    if (isNaN(ownerId) || ownerId.length !== 11) {
      return false;
    }
    return true;
  }
  
  // Function to validate the user ID
  function validateUserID(userId) {
    // Check if the user ID is a number and has 11 digits
    if (isNaN(userId) || userId.length !== 11) {
      return false;
    }
    return true;
  }
  
  // Function to validate the license plate number
  function validateLicensePlate(licensePlate) {
    // Check if the license plate matches the pattern 4 digits followed by 3 letters
    const pattern = /^[0-9]{4} [A-Za-z]{3}$/;
    return pattern.test(licensePlate);
  }
  
  // Function to validate the vehicle chassis number
  function validateVehicleChassis(vehicleChassis) {
    // Check if the vehicle chassis number is 17 characters long
    if (vehicleChassis.length !== 17) {
      return false;
    }
    return true;
  }
  
  // Function to validate the insurance start and end dates
  function validateInsuranceDates(startDate, endDate) {
    // Check if the start date is before the end date
    if (new Date(startDate) > new Date(endDate)) {
      return false;
    }
    return true;
  }
  
  // Function to validate the inspection start and end dates
  function validateInspectionDates(startDate, endDate) {
    // Check if the start date is before the end date
    if (new Date(startDate) > new Date(endDate)) {
      return false;
    }
    return true;
  }
  
  // Function to handle form submission
  function handleFormSubmission(event) {
    event.preventDefault();
  
    // Get the form data
    const owner = document.getElementById('Owner').value;
    const ownerId = document.getElementById('OwnerID').value;
    const licensePlate = document.getElementById('LicensePlate').value;
    const vehicleChassis = document.getElementById('VehicleChassis').value;
    const registrationType = document.getElementById('RegistrationType').value;
    const vehicleBrand = document.getElementById('VehicleBrand').value;
    const vehicleModel = document.getElementById('VehicleModel').value;
    const colour = document.getElementById('Colour').value;
    const manufactureYear = document.getElementById('ManufactureYear').value;
    const serialNumber = document.getElementById('Serial_number').value;
    const insuranceStart = document.getElementById('insurance_start').value;
    const insuranceEnd = document.getElementById('insurance_end').value;
    const inspectionStart = document.getElementById('inspection_start').value;
    const inspectionEnd = document.getElementById('inspection_end').value;
  
    // Validate the form data
    if (!validateOwnerID(ownerId)) {
      alert('Invalid owner ID. Please enter a valid 11-digit number.');
      return;
    }
  
    if (!validateUserID(userId)) {
      alert('Invalid user ID. Please enter a valid 11-digit number.');
      return;
    }
  
    if (!validateLicensePlate(licensePlate)) {
      alert('Invalid license plate number. Please enter a valid 4-digit number followed by 3 letters.');
      return;
    }
  
    if (!validateVehicleChassis(vehicleChassis)) {
      alert('Invalid vehicle chassis number. Please enter a valid 17-character number.');
      return;
    }
  
    if (!validateInsuranceDates(insuranceStart, insuranceEnd)) {
      alert('Invalid insurance dates. Please ensure the start date is before the end date.');
      return;
    }
  
    if (!validateInspectionDates(inspectionStart, inspectionEnd)) {
      alert('Invalid inspection dates. Please ensure the start date is before the end date.');
      return;
    }
  
    // If all validations pass, submit the form
    document.getElementById('form').submit();
  }
  
  // Add event listener to the form
  document.getElementById('form').addEventListener('submit', handleFormSubmission);