// Validation.js

// Function to validate owner form fields
function validateOwnerForm() {
  const ownerName = document.getElementById('Owner');
  const ownerID = document.getElementById('OwnerID');
  const ownerIDFile = document.getElementById('formOwnerIDFile');
  const user = document.getElementById('Owner');
  const userID = document.getElementById('OwnerID');
  const userIDFile = document.getElementById('formUserIDFile');

  // Check if owner name is provided
  if (ownerName.value.trim() === '') {
      document.getElementById('Owner-error').textContent = 'Owner name is required';
      return false;
  } else {
      document.getElementById('Owner-error').textContent = '';
  }

  // Check if owner ID is provided and valid
  if (ownerID.value.trim() === '' || !/^[0-9]{10}$/.test(ownerID.value)) {
      document.getElementById('OwnerID-error').textContent = 'Please enter a valid owner ID (10 digits)';
      return false;
  } else {
      document.getElementById('OwnerID-error').textContent = '';
  }

  // Check if owner ID file is uploaded
  if (ownerIDFile.files.length === 0) {
      document.getElementById('formOwnerIDFile-error').textContent = 'Please upload owner ID';
      return false;
  } else {
      document.getElementById('formOwnerIDFile-error').textContent = '';
  }

  // Add additional validations for other fields if needed

  return true; // Form is valid
}

// Function to validate vehicle form fields
function validateVehicleForm() {
  // Add validations for vehicle form fields similar to the owner form
}

// Event listener for form submission
document.getElementById('confirm-btn').addEventListener('click', function(event) {
  // Prevent form submission
  event.preventDefault();

  // Validate owner form
  if (!validateOwnerForm()) {
      return;
  }

  // Validate vehicle form
  if (!validateVehicleForm()) {
      return;
  }

  // Open the confirmation modal
  openModal('myModal');
});

// Event listener for confirmation modal
document.getElementById('acceptConfirm').addEventListener('click', function() {
  // Close the confirmation modal
  closeModal('myModal');

  // Submit the form
  document.getElementById('Form').submit();

  // Open the success modal
  openModal('mySuccessModal');
});

// Event listener for cancel button in confirmation modal
document.getElementById('cancel').addEventListener('click', function() {
  // Close the confirmation modal
  closeModal('myModal');
});

// Function to open a modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

// Function to close a modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Event listener for close buttons in modals
document.querySelectorAll('.close').forEach(closeButton => {
  closeButton.addEventListener('click', function() {
    closeModal(this.parentNode.id);
  });
});

// Event listener for checkbox
document.getElementById('Check').addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('Check-error').textContent = '';
  } else {
    document.getElementById('Check-error').textContent = 'Please check the box to acknowledge.';
  }
});

// Event listener for "Add another truck" button
document.getElementById('addTruck-btn').addEventListener('click', function() {
  // ... (code to add another truck form)
});

// ... (additional JavaScript code for form functionality)