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

  // Function to check if all date and file fields are filled
  function validateFields() {
      const dateFields = [
          'insurance_start',
          'insurance_end',
          'inspection_start',
          'inspection_end'
      ];

      const fileFields = [
          'formOwnerIDFile',
          'formUserIDFile',
          'formVehicleRegistrationFile',
          'formVehiclePhotoFile'
      ];

      for (const field of dateFields) {
          const value = document.getElementById(field).value;
          if (!value) {
              return false;
          }
      }

      for (const field of fileFields) {
          const file = document.getElementById(field).files[0];
          if (!file) {
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
          alert('Please fill in all date and file fields.');
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
