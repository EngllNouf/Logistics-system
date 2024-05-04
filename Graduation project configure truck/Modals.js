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
  modal1.style.display = "none";
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
// Function to validate form fields
function validateForm() {
  const ownerName = document.getElementById('Owner');
  const ownerID = document.getElementById('OwnerID');
  const userID = document.getElementById('UserID');
  const licensePlate = document.getElementById('LicensePlate');
  const vehicleChassis = document.getElementById('VehicleChassis');
  const registrationType = document.getElementById('RegistrationType');
  const vehicleBrand = document.getElementById('VehicleBrand');
  const vehicleModel = document.getElementById('VehicleModel');
  const colour = document.getElementById('Colour');
  const manufactureYear = document.getElementById('ManufactureYear');
  const serialNumber = document.getElementById('Serial_number');
  const insuranceStart = document.getElementById('insurance_start');
  const insuranceEnd = document.getElementById('insurance_end');
  const inspectionStart = document.getElementById('inspection_start');
  const inspectionEnd = document.getElementById('inspection_end');
  const checkBox = document.getElementById('Check');

  let isValid = true;

  // Validate owner name
  const ownerNameError = document.getElementById('Owner-error');
  if (ownerName.value.trim() === '') {
    ownerNameError.textContent = 'Owner name is required';
    isValid = false;
  } else {
    ownerNameError.textContent = '';
  }

  // Validate owner ID
// Validate owner ID
const ownerIDError = document.getElementById('OwnerID-error');
if (ownerID.value.trim() === '') {
  ownerIDError.textContent = 'Owner ID is required';
  ownerIDError.style.color = 'red'; // Change text color to red
  isValid = false;
} else if (!/^[0-9]{10}$/.test(ownerID.value)) {
  ownerIDError.textContent = 'Please enter a valid owner ID (10 digits)';
  ownerIDError.style.color = 'red'; // Change text color to red
  isValid = false;
} else {
  ownerIDError.textContent = '';
}

// Validate license plate (take thime )


const licensePlateError = document.getElementById('LicensePlate-error');
if (licensePlate.value.trim() === '') {
  licensePlateError.textContent = 'License plate is required';
  licensePlateError.style.color = 'red'; // Change text color to red
  isValid = false;
} else if (!licensePlate.value.match(/[0-9]{4} [A-Za-z]{3}/)) {
  licensePlateError.textContent = 'Please enter a valid license plate (e.g., 0000 ABC)';
  licensePlateError.style.color = 'red'; // Change text color to red
  isValid = false;
} else {
  licensePlateError.textContent = '';
}



  // Validate checkbox
  const checkBoxError = document.getElementById('Check-error');
  if (!checkBox.checked) {
    checkBoxError.textContent = 'Please acknowledge';
    isValid = false;
  } else {
    checkBoxError.textContent = '';
  }

  // Additional validation for empty fields
  if (!registrationType.value.trim()) {
    document.getElementById('RegistrationType-error').textContent = 'Registration type is required';
    isValid = false;
  } else {
    document.getElementById('RegistrationType-error').textContent = '';
  }

  if (!vehicleBrand.value.trim()) {
    document.getElementById('VehicleBrand-error').textContent = 'Vehicle brand is required';
    isValid = false;
  } else {
    document.getElementById('VehicleBrand-error').textContent = '';
  }
 // Validate vehicle chassis number
const vehicleChassisError = document.getElementById('VehicleChassis-error');

if (vehicleChassis.value.trim() === '') {
  vehicleChassisError.textContent = 'Vehicle chassis number is required';
  vehicleChassisError.style.color = 'red'; // Change text color to red
  isValid = false;
} else if (vehicleChassis.value.length !== 17) {
  vehicleChassisError.textContent = 'Vehicle chassis number must be exactly 17 characters long';
  vehicleChassisError.style.color = 'red'; // Change text color to red
  isValid = false;
} else {
  vehicleChassisError.textContent = '';
}


  return isValid;
}



function validateInput(input) {
  const errorElement = document.getElementById(`${input.id}-error`);
  if (errorElement) {
    if (input.value.trim() === "") {
      errorElement.textContent = `${input.name} is required`;
      errorElement.style.color = "red"; // تغيير لون النص إلى أحمر
    } else {
      errorElement.textContent = ""; // مسح رسالة الخطأ
      errorElement.style.color = "green"; // تغيير لون النص إلى أخضر
    }
    // تحقق من أن عنصر الإدخال هو OwnerID وأن القيمة ليست من 10 أرقام
    if (input.id === 'OwnerID' && input.value.trim().length !== 10) {
      errorElement.textContent = 'Owner ID must be exactly 10 digits';
      errorElement.style.color = 'red'; // تغيير لون النص إلى أحمر
    }
  }
}


function validateLicensePlate() {
  const licensePlate = document.getElementById('LicensePlate');
  const licensePlateError = document.getElementById('LicensePlate-error');

  if (licensePlate.value.trim() === '') {
    licensePlateError.textContent = 'License plate is required';
    licensePlateError.style.color = 'red'; // Change text color to red
    return false;
  } else if (!licensePlate.value.match(/[0-9]{4} [A-Za-z]{3}/)) {
    licensePlateError.textContent = 'Please enter a valid license plate (e.g., 0000 ABC)';
    licensePlateError.style.color = 'red'; // Change text color to red
    return false;
  } else {
    licensePlateError.textContent = '';
    return true;
  }
}



// Function to validate file input
function validateFileInput(fileInput) {
  const errorElement = document.getElementById(`${fileInput.id}-error`);
  if (errorElement) {
    if (fileInput.files.length === 0) {
      errorElement.textContent = `${fileInput.name} is required`;
      errorElement.style.color = "red"; // Change text color to red
    } else {
      errorElement.textContent = ""; // Clear the error message
      errorElement.style.color = "green"; // Change text color to green
    }
  }
}
function validateLicensePlate() {
  const licensePlate = document.getElementById('LicensePlate');
  const licensePlateError = document.getElementById('LicensePlate-error');

  if (licensePlate.value.trim() === '') {
    licensePlateError.textContent = 'License plate is required';
    licensePlateError.style.color = 'red'; // Change text color to red
    return false;
  } else if (!licensePlate.value.match(/^[A-Za-z0-9]{1,10}$/)) {
    licensePlateError.textContent = 'Please enter a valid license plate';
    licensePlateError.style.color = 'red'; // Change text color to red
    return false;
  } else {
    licensePlateError.textContent = '';
    return true;
  }
}


// Event listeners for real-time validation

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", function () {
    if (input.type !== "file") {
      validateInput(input);
    }
  });
});

document.querySelectorAll('input[type="file"]').forEach((fileInput) => {
  fileInput.addEventListener("change", function () {
    validateFileInput(fileInput);
  });
});

document.getElementById('Check').addEventListener('change', function() {
  const checkBoxError = document.getElementById('Check-error');
  if (!this.checked) {
    checkBoxError.textContent = 'Please acknowledge';
    checkBoxError.style.color = "red";
  } else {
    checkBoxError.textContent = '';
  }
});

// Event listener for form submission
document.getElementById('confirm-btn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission

  // Validate the form
  if (validateForm()) {
    // Submit the form
    document.getElementById('Form').submit();
  } else {
    // Display an error message
    alert('Please fill in all required fields and correct any errors.');
  }
})