function validateInput(input) {
    
    const errorElement = document.getElementById(`${input.id}-error`);
    if (errorElement) {
      if (input.value.trim() === "") {
        errorElement.textContent = `${input.name} is required`;
        errorElement.style.color = "red"; // تغيير لون النص إلى أحمر
      } else {
        errorElement.textContent = ""; // مسح رسالة الخطأ
      }
      // تحقق من أن عنصر الإدخال هو OwnerID وأن القيمة ليست من 10 أرقام
      if (input.id === 'OwnerID' && input.value.trim().length !== 10) {
        errorElement.textContent = 'Owner ID must be exactly 10 digits';
        errorElement.style.color = 'red'; // تغيير لون النص إلى أحمر
      }

      //Validate chassis length
      if (input.id === 'VehicleChassis' && input.value.trim().length !== 17) {
        errorElement.textContent = 'Vehicle chassis must be exactly 17 digits';
        errorElement.style.color = 'red'; 
      }

      //Validate serial number length
      if (input.id === 'Serial_number' && (input.value.trim().length < 8 || input.value.trim().length > 10)) {
        errorElement.textContent = 'Serial number must be between 8 and 10 digits';
        errorElement.style.color = 'red'; 
      }

      // Validate Manufacture Year
      if (input.id === 'ManufactureYear') {
        const currentYear = new Date().getFullYear();
        const yearValue = parseInt(input.value.trim());
      
        if (input.value.trim().length !== 4 || yearValue > currentYear) {
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

      //Validate File input
      if (input.type === 'file') {
        const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];
        const fileExtension = input.value.split('.').pop().toLowerCase();
        const isValidFile = allowedExtensions.includes(fileExtension);
      
        if (!isValidFile) {
          errorElement.textContent = 'File must be either a photo (JPG, JPEG, PNG, GIF) or a PDF';
          errorElement.style.color = 'red';
        }
      }

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

  
  
  // Event listeners for real-time validation
  document.querySelectorAll("input").forEach((input) => {
    
    input.addEventListener("input", function () {
      if (input.type !== "file") {
        validateInput(input);
      }
    });
  });
  
  /* Event listener for form submission
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
  })*/