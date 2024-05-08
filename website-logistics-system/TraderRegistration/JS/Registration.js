// Maximum number of files allowed to be attached
const maxFiles = 2;

function handleFile(inputId, outputId) {
    const fileInput = document.getElementById(inputId);
    const fileList = document.getElementById(outputId);

    // Check if the maximum number of files is already attached
    if (fileInput.files.length + fileList.childElementCount > maxFiles) {
        alert("You can only attach up to " + maxFiles + " files.");
        // Clear the file input
        fileInput.value = '';
        return;
    }

    // Display attached files
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        // Check if the maximum number of files has been reached
        if (fileList.childElementCount >= maxFiles) {
            alert("You can only attach up to " + maxFiles + " files.");
            break;
        }

        const file = files[i];
        const fileItem = document.createElement('div');
        fileItem.classList.add('file-item');

        const fileName = document.createElement('span');
        fileName.classList.add('file-name');
        fileName.textContent = file.name;

        const deleteButton = document.createElement('span');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'X';
        deleteButton.addEventListener('click', function() {
            fileInput.value = ''; // Clear file input
            fileList.removeChild(fileItem); // Remove file item
        });

        fileItem.appendChild(fileName);
        fileItem.appendChild(deleteButton);
        fileList.appendChild(fileItem);
    }
}

function selectOption(option) {
    // Hide the welcome container
    document.getElementById('welcomeContainer').style.display = 'none';

    // Show the form container only if the user selects "trader"
    if (option === 'trader') {
        // Show the form container
        document.getElementById('formContainer').style.display = 'block';
        // Show only the company details form initially
        document.getElementById('step1').style.display = 'flex';

        // Show points above the forms
        document.getElementById('point1').style.display = 'block';
        document.getElementById('point2').style.display = 'block';

        // Apply slide animation to the company details form
        document.getElementById('step1').classList.add('company-details');
        document.getElementById('step2').style.display = 'none';
        currentStep = 1;

        document.getElementById('point1').classList.add('active');

    }else if (option === 'transportation') {
            // Show the transportation company registration form container
            document.getElementById('transportationRegistrationForm').style.display = 'block';
            // Show only the transportation company details form initially
            document.getElementById('transportationStep1').style.display = 'flex';
        
        
    } else {
        // Hide the form container for other options
        document.getElementById('formContainer').style.display = 'none';
    }
}



function nextStep() {

    event.preventDefault();
    if (validateStep1()) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'flex';
        document.getElementById('point1').classList.remove('active'); // Remove active class from point 1
        document.getElementById('point2').classList.add('active'); // Add active class to point 2
        currentStep = 2;
    }
}




function backToWelcomeFromForm() {
    // Hide the welcome container
    document.getElementById('welcomeContainer').style.display = 'block';
    
    // Hide the form container
    document.getElementById('formContainer').style.display = 'none';
    
    // Hide the points
    document.getElementById('point1').style.display = 'none';
    document.getElementById('point2').style.display = 'none';
}


function backStep() {
    event.preventDefault(); 
    // Show the company details form when the user clicks "Back"
    document.getElementById('step1').style.display = 'flex';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('point1').classList.add('active'); // Add active class to point 1
    document.getElementById('point2').classList.remove('active'); // Remove active class from point 2
    currentStep = 1;
}


//next button - trader form

document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the "Next" button
    document.getElementById('nextButton').addEventListener('click', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Call the function to validate trader details and proceed to the next step
        validateAndProceedToNextStep();
    });
});

// Function to handle "Next" button click and validate trader details
function validateAndProceedToNextStep() {
    // Validate trader details before proceeding
    if (validateTraderDetails()) {
        // Proceed to the next step
        document.getElementById('submitButton').style.display = 'block';
    }
}

// Function to validate trader details
function validateTraderDetails() {
    let traderName = document.getElementById('traderName').value;
    let traderPhoneNumber = document.getElementById('traderPhoneNumber').value;
    let traderAddress = document.getElementById('traderAddress').value;
    let industrySelect = document.getElementById('industrySelect').value;
    let idNumber = document.getElementById('idNumber').value;
    const fileInput = document.getElementById('fileInput2');

    // Error message containers
    let nameError = document.getElementById('nameError');
    let phoneNumberError = document.getElementById('phoneNumberError');
    let addressError = document.getElementById('addressError');
    let industryError = document.getElementById('industryError');
    let idNumberError = document.getElementById('idNumberError');
    const fileError = document.getElementById('fileError2');

    let isValid = true;

    // Validate trader name
    if (traderName.trim() === '') {
        nameError.innerText = '* Required';
        isValid = false;
    } else if (!validateTraderName(traderName)) {
        nameError.innerText = '* Trader name can only contain letters';
        isValid = false;
    } else {
        nameError.innerText = '';
    }

    // Validate phone number
    if (traderPhoneNumber.trim() === '') {
        phoneNumberError.innerText = '* Required';
        isValid = false;
    } else if (!validatePhoneNumber(traderPhoneNumber)) {
        phoneNumberError.innerText = '* Invalid phone number format example : 05********';
        isValid = false;
    } else {
        phoneNumberError.innerText = '';
    }

    // Validate address
    if (traderAddress.trim() === '') {
        addressError.innerText = '* Required';
        isValid = false;
    } else {
        addressError.innerText = '';
    }

    // Validate industry
    if (industrySelect === '') {
        industryError.innerText = '* Required';
        isValid = false;
    } else {
        industryError.innerText = '';
    }

    // Validate ID number
    if (idNumber.trim() === '') {
        idNumberError.innerText = '* Required';
        isValid = false;
    } else if (!validateIdNumber(idNumber)) {
        idNumberError.innerText = '* Invalid ID number format , national id : 10 numbers , iqama : 15';
        isValid = false;
    } else {
        idNumberError.innerText = '';
    }

    // Validate attached files
    if (fileInput.files.length === 0) {
        fileError.innerText = '* Please attach a file';
        isValid = false;
    } else {
        fileError.innerText = '';
    }

    return isValid;
}


const msg = document.getElementById("msg");

document.getElementById("TraderRegistrationForm").addEventListener("submit", function (e) {
    // Prevent default form submission
    e.preventDefault();

    msg.innerHTML = '';

    // Reading user input
    let companyName = document.getElementById("companyName").value;
    let companyEmail = document.getElementById("companyEmail").value;
    let companyAddress = document.getElementById("companyAddress").value;
    let citySelect = document.getElementById("citySelect").value;
    let companyZip = document.getElementById("companyZip").value;
    let companyVat = document.getElementById("companyVat").value;
    let companyLicense = document.getElementById("companyLicense").value;
    let traderName = document.getElementById("traderName").value;
    let traderPhoneNumber = document.getElementById("traderPhoneNumber").value;
    let traderAddress = document.getElementById("traderAddress").value;
    let industrySelect = document.getElementById("industrySelect").value;
    let idNumber = document.getElementById("idNumber").value;
    const fileInput = document.getElementById("fileInput2");
    const fileList = document.getElementById("fileList2");

    // Sending AJAX request
    fetch("/process", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            companyName: companyName,
            companyEmail: companyEmail,
            companyAddress: companyAddress,
            citySelect: citySelect,
            companyZip: companyZip,
            companyVat: companyVat,
            companyLicense: companyLicense,
            traderName: traderName,
            traderPhoneNumber: traderPhoneNumber,
            traderAddress: traderAddress,
            industrySelect: industrySelect,
            idNumber: idNumber
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.errors) {
            data.errors.forEach(error => {
                const li = document.createElement('li');
                li.textContent = error.msg;
                msg.appendChild(li);
            });
        } else {
            // Reset form fields
            document.getElementById("TraderRegistrationForm").reset();
        }
    })
    .catch(function (error) {
        console.error(error);
    });
});



/*$(document).ready(function() {
    $('.select2').select2();
}); */

function validateStep1() {
    const companyName = document.getElementById('companyName').value;
    const companyEmail = document.getElementById('companyEmail').value;
    const companyAddress = document.getElementById('companyAddress').value;
    const citySelect = document.getElementById('citySelect');
    const companyZip = document.getElementById('companyZip').value;
    const companyVat = document.getElementById('companyVat').value;
    const companyLicense = document.getElementById('companyLicense').value;
  

    
    const companyNameError = document.getElementById('companyNameError');
    const companyEmailError = document.getElementById('companyEmailError');
    const AddressError = document.getElementById('AddressError');
    const citySelectError = document.getElementById('citySelectError');
    const ZipError = document.getElementById('ZipError');
    const VatError = document.getElementById('VatError');
    const LicenseError = document.getElementById('LicenseError');
    const fileList1 = document.getElementById('fileList1');
    const fileInput1 = document.getElementById('fileInput1');
    const fileError1 = document.getElementById('fileError1');

    let isValid = true;

    
    if (companyName.trim() === '') {
        companyNameError.innerText = '* Required';
        isValid = false;
        
     
        setTimeout(() => {
            companyNameError.innerText = '';
        }, 4000);
    }

    if (companyEmail.trim() === '') {
        companyEmailError.innerText = '* Required';
        isValid = false;
        
      
        setTimeout(() => {
            companyEmailError.innerText = '';
        }, 4000);
    }else if (!validateEmail(companyEmail)) {
        companyEmailError.innerText = '* Invalid email format';
        isValid = false;
        setTimeout(() => {
            companyEmailError.innerText = '';
        }, 4000);
    }

    if (companyAddress.trim() === '') {
        AddressError.innerText = '* Required';
        isValid = false;
        
       
        setTimeout(() => {
            AddressError.innerText = '';
        }, 4000);
    }
     if (citySelect.value === '') {
        citySelectError.innerText = '* Required';
        isValid = false;
        setTimeout(() => {
            citySelectError.innerText = '';
        }, 4000);
    }


    if (companyZip.trim() === '') {
        ZipError.innerText = '* Required';
        isValid = false;
      
        setTimeout(() => {
            ZipError.innerText = '';
        }, 4000);
    }else if (!validateZip(companyZip)) {
        ZipError.innerText = '* Zip code number must contain 5 digits only';
        isValid = false;
        setTimeout(() => {
            ZipError.innerText = '';
        }, 4000);
    }
    if (companyVat.trim() === '') {
        VatError.innerText = '* Required';
        isValid = false;
        
       
        setTimeout(() => {
            VatError.innerText = '';
        }, 4000);
    }else if (!validateVatNumber(companyVat)) {
        VatError.innerText = '* VAT number must contain 15 digits only';
        isValid = false;
        setTimeout(() => {
            VatError.innerText = '';
        }, 4000);
    }
   
    if (companyLicense.trim() === '') {
        LicenseError.innerText = '* Required';
        isValid = false;
       
        setTimeout(() => {
            LicenseError.innerText = '';
        }, 4000);
    }else if (!validateLicenseNumber(companyLicense)) {
        LicenseError.innerText = '* License number must contain 10 digits only';
        isValid = false;
        setTimeout(() => {
            LicenseError.innerText = '';
        }, 4000);
    }

    if (fileInput1.files.length === 0) {
        fileError1.innerText = '* Please attach a file';
        isValid = false;
        setTimeout(() => {
            fileError1.innerText = '';
        }, 4000);
    }

   
   

    return isValid;
}
function validateVatNumber(vatNumber) {
  
    const vatRegex = /^\d{15}$/;
    return vatRegex.test(vatNumber);
}
function validateLicenseNumber(licenseNumber) {
    
    const licenseRegex = /^\d{10}$/;
    return licenseRegex.test(licenseNumber);
}
function validateEmail(email) {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function validateZip(zipCode) {
  
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zipCode);
}

function validatePhoneNumber(phoneNumber) {
    
    const phoneRegex = /^05\d{8}$/;
    return phoneRegex.test(phoneNumber);
}

function validateIdNumber(idNumber) {
   
    const saudiIdRegex = /^\d{10}$/;
    const iqamaIdRegex = /^\d{15}$/;
    
    return saudiIdRegex.test(idNumber) || iqamaIdRegex.test(idNumber);
}

function validateTraderName(traderName) {
  
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(traderName);
}





document.addEventListener('DOMContentLoaded', function() {
    // Your code here
    document.getElementById('transportationRegistrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission behavior
        submitTransportationForm(); 
    });
});

function submitTransportationForm() {
    // Retrieve form field values
    let commercialRegistrationName = document.getElementById('commercialRegistrationName').value;
    let commercialRegistrationNumber = document.getElementById('commercialRegistrationNumber').value;
    let commercialRegistrationID = document.getElementById('commercialRegistrationID').value;
    let issueDate = document.getElementById('issueDate').value;
    let expirationDate = document.getElementById('expirationDate').value;
    let licenseType = document.getElementById('licenseType').value;
    let licenseNumber = document.getElementById('licenseNumber').value;
    let transportationActivity = document.getElementById('transportationActivity').value;
    let companySpecialization = document.getElementById('companySpecialization').value;

    // Retrieve error message elements
    let commercialRegistrationNameError = document.getElementById('commercialRegistrationNameError');
    let commercialRegistrationNumberError = document.getElementById('commercialRegistrationNumberError');
    let commercialRegistrationIDError = document.getElementById('commercialRegistrationIDError');
    let issueDateError = document.getElementById('issueDateError');
    let expirationDateError = document.getElementById('expirationDateError');
    let licenseTypeError = document.getElementById('licenseTypeError');
    let licenseNumberError = document.getElementById('licenseNumberError');
    let transportationActivityError = document.getElementById('transportationActivityError');
    let companySpecializationError = document.getElementById('companySpecializationError');

    // Retrieve file input elements and error message elements
    let commercialRegistrationFileInput = document.getElementById('commercialRegistrationFile');
    let ownerIdFileInput = document.getElementById('ownerIdFile');
    let licenseFileInput = document.getElementById('licenseFile');
    let commissionerIdFileInput = document.getElementById('commissionerIdFile');
    let commercialRegistrationFileError = document.getElementById('commercialRegistrationFileError');
    let ownerIdFileError = document.getElementById('ownerIdFileError');
    let licenseFileError = document.getElementById('licenseFileError');
    let commissionerIdFileError = document.getElementById('commissionerIdFileError');

    let isValid = true;


  

    // Validate commercial registration name
    if (commercialRegistrationName.trim() === '') {
        commercialRegistrationNameError.innerText = '* Required';
        isValid = false;
    } else {
        commercialRegistrationNameError.innerText = '';
    }

    // Validate commercial registration number
    if (commercialRegistrationNumber.trim() === '') {
        commercialRegistrationNumberError.innerText = '* Required';
        isValid = false;
    } else {
        commercialRegistrationNumberError.innerText = '';
    }

    // Validate commercial registration ID
    if (commercialRegistrationID.trim() === '') {
        commercialRegistrationIDError.innerText = '* Required';
        isValid = false;
    } else {
        commercialRegistrationIDError.innerText = '';
    }

    // Validate issue date
    if (issueDate.trim() === '') {
        issueDateError.innerText = '* Required';
        isValid = false;
    } else {
        issueDateError.innerText = '';
    }

    // Validate expiration date
    if (expirationDate.trim() === '') {
        expirationDateError.innerText = '* Required';
        isValid = false;
    } else {
        expirationDateError.innerText = '';
    }

    // Validate license type
    if (licenseType === '') {
        licenseTypeError.innerText = '* Required';
        isValid = false;
    } else {
        licenseTypeError.innerText = '';
    }

    // Validate license number
    if (licenseNumber.trim() === '') {
        licenseNumberError.innerText = '* Required';
        isValid = false;
    } else {
        licenseNumberError.innerText = '';
    }

    // Validate transportation activity
    if (transportationActivity === '') {
        transportationActivityError.innerText = '* Required';
        isValid = false;
    } else {
        transportationActivityError.innerText = '';
    }

    // Validate company specialization
    if (companySpecialization.trim() === '') {
        companySpecializationError.innerText = '* Required';
        isValid = false;
    } else {
        companySpecializationError.innerText = '';
    }

  // Handle file attachments...
      // Handle file attachments...
    if (commercialRegistrationFileInput.files.length === 0) {
        commercialRegistrationFileError.innerText = '* Please attach a file';
        isValid = false;
    } else {
        commercialRegistrationFileError.innerText = '';
    }

    if (ownerIdFileInput.files.length === 0) {
        ownerIdFileError.innerText = '* Please attach a file';
        isValid = false;
    } else {
        ownerIdFileError.innerText = '';
    }

    if (licenseFileInput.files.length === 0) {
        licenseFileError.innerText = '* Please attach a file';
        isValid = false;
    } else {
        licenseFileError.innerText = '';
    }

    if (commissionerIdFileInput.files.length === 0) {
        commissionerIdFileError.innerText = '* Please attach a file';
        isValid = false;
    } else {
        commissionerIdFileError.innerText = '';
    }


    if (!isValid) {
        return false; // Prevent form submission if validation fails
    }

    // Fetch request to submit form data
    fetch("/process", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            commercialRegistrationName,
            commercialRegistrationNumber,
            commercialRegistrationID,
            issueDate,
            expirationDate,
            licenseType,
            licenseNumber,
            transportationActivity,
            companySpecialization
        })
    })
    .then(function(response) {
        if (response.ok) {
            alert("Data inserted successfully!");
            // Reset the form fields if needed
            // document.getElementById('transportationRegistrationForm').reset();
        } else {
            alert("Failed to insert data!");
        }
    })
    .catch(function(error) {
        console.error('Error:', error);
        alert("An error occurred while submitting the form!");
    });
}
