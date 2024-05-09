document.addEventListener("DOMContentLoaded", function() {
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

  // When the user clicks on <span> (x), close the modal
  span1.onclick = function() {
      modal1.style.display = "none";
  }

  span2.onclick = function() {
      modal2.style.display = "none";
  }

//validation 
function validateInput(input) {
    var confirm = document.getElementById("confirm-btn");
    
    const errorElement = document.getElementById(`${input.id}-error`);
  
    if (errorElement) {
      if (input.value.trim() === "") {
        errorElement.textContent = `${input.name} is required`;
        errorElement.style.color = "red"; // تغيير لون النص إلى أحمر
      } else {
        errorElement.textContent = ""; // مسح رسالة الخطأ
      }
      // تحقق من أن عنصر الإدخال هو OwnerID وأن القيمة ليست من 10 أرقام
      if (input.id === 'OwnerID' && (input.value.trim().length !== 10 || isNaN(input.value))) {
        errorElement.textContent = 'Owner ID must be exactly 10 digits and contain only numbers';
        errorElement.style.color = 'red';
      }
  
     // Validate chassis
    if (input.id === 'VehicleChassis') {
        const value = input.value.trim();
        const hasLetters = /[a-zA-Z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasSpecialCharacters = /[^a-zA-Z0-9]/.test(value);
    
        if (value.length !== 17 || !hasLetters || !hasNumbers || hasSpecialCharacters) {
        errorElement.textContent = 'Vehicle chassis must be exactly 17 characters with both letters and numbers, and should not contain any special characters';
        errorElement.style.color = 'red';
        }
    }
  
      //Validate serial number 
      if (input.id === 'Serial_number' && (input.value.trim().length < 8 || input.value.trim().length > 10 || isNaN(input.value))) {
        errorElement.textContent = 'Serial number must be between 8 and 10 digits and contain only numbers';
        errorElement.style.color = 'red'; 
      }
  
      // Validate Manufacture Year
      if (input.id === 'ManufactureYear') {
        const currentYear = new Date().getFullYear();
        const yearValue = parseInt(input.value.trim());
      
        if (input.value.trim().length !== 4 || yearValue > currentYear || isNaN(input.value)) {
          errorElement.textContent = 'Manufacture year must be a valid 4-digit year';
          errorElement.style.color = 'red'; 
        }
      }
  
      //Validate License plate
      if (input.id === 'LicensePlate') {
        const licensePlateRegex = /^\d{4} [A-Za-z]{3}$/;
        const isValidLicensePlate = licensePlateRegex.test(input.value.trim());
      
        if (!isValidLicensePlate) {
          errorElement.textContent = '4 digit numbers, space, 3 digit letters = (1234 ABC)';
          errorElement.style.color = 'red';
        }
      }
  
      // Validate Insurance Start Date
      if (input.id === 'insurance_start') {
        const startDate = new Date(input.value);
        const currentDate = new Date();
      
        if (startDate > currentDate) {
          errorElement.textContent = 'Insurance start date cannot be in the future';
          errorElement.style.color = 'red';
        }
      }
      
      // Validate Insurance End Date
      if (input.id === 'insurance_end') {
        const endDate = new Date(input.value);
        const currentDate = new Date();
      
        if (endDate < currentDate) {
          errorElement.textContent = 'Insurance end date cannot be in the past';
          errorElement.style.color = 'red';
        }
      }
  
      // Validate inspection Start Date
      if (input.id === 'inspection_start') {
        const startDate = new Date(input.value);
        const currentDate = new Date();
      
        if (startDate > currentDate) {
          errorElement.textContent = 'inspection start date cannot be in the future';
          errorElement.style.color = 'red';
        }
      }
      
      // Validate inspection End Date
      if (input.id === 'inspection_end') {
        const endDate = new Date(input.value);
        const currentDate = new Date();
      
        if (endDate < currentDate) {
          errorElement.textContent = 'inspection end date cannot be in the past';
          errorElement.style.color = 'red';
        }
      }
  
      //Validate Owner name 
      if (input.id === 'Owner' && (input.value.trim().length < 2 || input.value.trim().length > 20 || !input.value.match(/^[A-Za-z]+$/))) {
        errorElement.textContent = 'Owner name must be between 2 and 20 digits and contain only letters';
        errorElement.style.color = 'red'; 
      }
  
      // Validate Registration type  
      if (input.id === 'RegistrationType' && (input.value.trim().length < 2 || input.value.trim().length > 20 || !input.value.match(/^[A-Za-z]+$/))) {
        errorElement.textContent = 'Registration type must be between 2 and 20 digits and contain only letters';
        errorElement.style.color = 'red'; 
      }
  
      
      //Validate Vehicle Brand  
      if (input.id === 'VehicleBrand' && (input.value.trim().length < 2 || input.value.trim().length > 20 || !input.value.match(/^[A-Za-z]+$/))) {
        errorElement.textContent = 'Vehicle Brand must be between 2 and 20 digits and contain only letters';
        errorElement.style.color = 'red'; 
      }
  
      //Validate Vehicle model  
      if (input.id === 'VehicleModel' && (input.value.trim().length < 2 || input.value.trim().length > 20 || !input.value.match(/^[A-Za-z]+$/))) {
        errorElement.textContent = 'Vehicle model must be between 2 and 20 digits and contain only letters';
        errorElement.style.color = 'red'; 
      }
  
      //Validate colour 
      if (input.id === 'Colour' && (input.value.trim().length < 2 || input.value.trim().length > 20 || !input.value.match(/^[A-Za-z]+$/))) {
        errorElement.textContent = 'Colour must be between 2 and 20 digits and contain only letters';
        errorElement.style.color = 'red'; 
      }
  
    }
  }
  
  // Validate File Inputs
  const fileInputs = document.querySelectorAll('input[type="file"]');
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];
  
  fileInputs.forEach(input => {
  input.addEventListener('change', () => {
    const errorElement = document.getElementById(input.id + '-error');
    const fileExtension = input.value.split('.').pop().toLowerCase();
    const isValidFile = allowedExtensions.includes(fileExtension);
  
    if (!isValidFile) {
      errorElement.textContent = 'File must be either a photo (JPG, JPEG, PNG, GIF) or a PDF';
      errorElement.style.color = 'red';
    } else {
      errorElement.textContent = ''; // Clear the error message if the file is valid
    }
  });
  });
  
  
  // Get the input elements
  const userInputElement = document.getElementById('user');
  const userIDInputElement = document.getElementById('userID');
  
  // Add event listeners for input focus and input events
  userInputElement.addEventListener('focus', handleUserValidation);
  userInputElement.addEventListener('input', handleUserValidation);
  userInputElement.addEventListener('blur', handleUserValidation);
  userIDInputElement.addEventListener('focus', handleUserIDValidation);
  userIDInputElement.addEventListener('input', handleUserIDValidation);
  userIDInputElement.addEventListener('blur', handleUserIDValidation);
  
  // Function to handle User field validation
  function handleUserValidation() {
  const userValue = userInputElement.value.trim();
  const userErrorElement = document.getElementById('user-errorMsg');
  
  if (document.activeElement === userInputElement) {
    if (userValue !== '' && !/^[A-Za-z]{2,20}$/.test(userValue)) {
      userErrorElement.textContent = 'User name must be between 2 and 20 characters and contain only letters';
      userErrorElement.style.color = 'red';
    } else {
      userErrorElement.textContent = '';
    }
  } else {
    userErrorElement.textContent = '';
  }
  }
  
  // Function to handle User ID field validation
  function handleUserIDValidation() {
  const userIDValue = userIDInputElement.value.trim();
  const userIDErrorElement = document.getElementById('userID-errorMsg');
  
  if (document.activeElement === userIDInputElement) {
    if (userIDValue !== '' && !/^\d{10}$/.test(userIDValue)) {
      userIDErrorElement.textContent = 'User ID must be exactly 10 digits and contain only numbers';
      userIDErrorElement.style.color = 'red';
    } else {
      userIDErrorElement.textContent = '';
    }
  } else {
    userIDErrorElement.textContent = '';
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

// Function to check if all required fields are filled
function validateFields() {
    const requiredFields = [
      'Owner',
      'OwnerID',
      'formOwnerIDFile',
      'LicensePlate',
      'VehicleChassis',
      'RegistrationType',
      'VehicleBrand',
      'VehicleModel',
      'Colour',
      'ManufactureYear',
      'insurance_start',
      'insurance_end',
      'inspection_start',
      'inspection_end',
      'formVehicleRegistrationFile',
      'formVehiclePhotoFile'
    ];
  
    for (const field of requiredFields) {
      const value = document.getElementById(field).value;
      const errorElement = document.getElementById(`${field}-error`);
  
      if (!value || errorElement.textContent !== '') {
        return false;
      }
    }
  
    return true;
}

  // Event listener for confirm button
  document.getElementById('confirm-btn').addEventListener('click', function() {
      console.log("Confirm button clicked");
      if (validateFields()) {
          console.log("All fields are filled");
          // Open the modal if all fields are filled
          showModal1();
      } else {
          console.log("Fields are not filled");
          // Display an alert if any field is empty
          alert('Please fill in all required fields correctly.');
      }
  });

  // When the user clicks on cancel button, close the modal
  cancelbtn.onclick = function() {
      modal1.style.display = "none";
  }

  // When the user clicks on confirm button, close the FIRST modal and open SECOND model
  acceptConfirmbtn.onclick = function() {
      modal1.style.display = "none";
      modal2.style.display = "block";
  }

  // Function to open modal 1
  function showModal1() {
      modal1.style.display = "block";
  }
});
