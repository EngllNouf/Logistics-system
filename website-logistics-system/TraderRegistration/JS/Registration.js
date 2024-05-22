function selectOption(option) {
    // Hide the welcome container
    document.getElementById('welcomeContainer').style.display = 'none';

    // Show the form container only if the user selects "trader"
    if (option === 'trader') {
        // Show the form 
        document.getElementById('TraderRegistrationForm').style.display = 'block';
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
        
        
    } 
}
   


// Maximum number of files allowed to be attached
const maxFiles = 1;
function handleFile(inputId, outputId) {
    const fileInput = document.getElementById(inputId);
    const fileList = document.getElementById(outputId);

      // Check if the maximum number of files is already attached
      if (fileInput.files.length > maxFiles) {
        alert("You can only attach up to " + maxFiles + " files.");
        // Clear the file input
        fileInput.value = '';
        return;
    }


    // Remove existing files from the output
    while (fileList.firstChild) {
        fileList.removeChild(fileList.firstChild);
    }

    // Display the newly attached file
    const files = fileInput.files;
    if (files.length > 0) {
        const file = files[0];
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



    
    //to make the calender ends on todays date
    let issueDateInput = document.getElementById('issueDate');
    // Set the maximum date allowed in the issue date field to today's date
    issueDateInput.max = new Date().toISOString().split("T")[0];


function nextStep() {

    event.preventDefault();
    if (validateTraderCompany()) {
        document.getElementById('step1').style.display = 'none';
        document.getElementById('step2').style.display = 'flex';
        document.getElementById('point1').classList.remove('active'); 
        document.getElementById('point2').classList.add('active'); 
        currentStep = 2;
    }
}

function validateTraderCompany() {
    let companyName = document.getElementById('companyName').value;
    let companyEmail = document.getElementById('companyEmail').value;
    let companyAddress = document.getElementById('companyAddress').value;
    let citySelect = document.getElementById('citySelect');
    let companyZip = document.getElementById('companyZip').value;
    let companyVat = document.getElementById('companyVat').value;
    let companyLicense = document.getElementById('companyLicense').value;
    let commercialRegistrationFile1Input = document.getElementById('commercialRegistrationFile1'); 
    
  

    
    let companyNameError = document.getElementById('companyNameError');
    let companyEmailError = document.getElementById('companyEmailError');
    let AddressError = document.getElementById('AddressError');
    let citySelectError = document.getElementById('citySelectError');
    let ZipError = document.getElementById('ZipError');
    let VatError = document.getElementById('VatError');
    let LicenseError = document.getElementById('LicenseError');
    let commercialRegistrationFile1Error = document.getElementById('commercialRegistrationFile1Error');

    let isValid = true;

    // Validate company name
if (companyName.trim() === '') {
    companyNameError.innerText = '* Required';
    isValid = false;
} else if (!/^[a-zA-Z0-9\s]+$/.test(companyName)) {
    companyNameError.innerText = '* Company name should only contain letters, numbers, and spaces';
    isValid = false;
} else {
    companyNameError.innerText = '';
}
    
    //validaite email
    if (companyEmail.trim() === '') {
        companyEmailError.innerText = '* Required';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyEmail)) {
    companyEmailError.innerText = '* Invalid email format example: emailExample@gmail.com';
    isValid = false;
    } else {
    companyEmailError.innerText = '';
    }

    // Validate company address
    if (companyAddress.trim() === '') {
       AddressError.innerText = '* Required';
       isValid = false;
    } else {
        AddressError.innerText = '';
    }

// Validate city selection
if (citySelect.value === '') {
    citySelectError.innerText = '* Required';
    isValid = false;
} else {
    citySelectError.innerText = '';
}

//validate zip
if (companyZip.trim() === '') {
    ZipError.innerText = '* Required';
    isValid = false;
} else if (!/^\d{5}$/.test(companyZip)) {
    ZipError.innerText = '* Zip code must contain exactly 5 digits';
    isValid = false;
} else {
    ZipError.innerText = '';
}

 // Validate VAT number 
 if (companyVat.trim() === '') {
    VatError.innerText = '* Required';
    isValid = false;
} else if (!/^\d{15}$/.test(companyVat)) {
    VatError.innerText = '* VAT number must contain exactly 15 digits';
    isValid = false;
} else {
    VatError.innerText = '';
}
//validate license number
  if (companyLicense.trim() === '') {
        LicenseError.innerText = '* Required';
        isValid = false;
    } else if (!/^\d{10}$/.test(companyLicense)) {
        LicenseError.innerText = '* License number must contain exactly 10 digits';
        isValid = false;
    } else {
        LicenseError.innerText = '';
    }
// Validate file attachment
if (commercialRegistrationFile1Input.files.length === 0) {
    commercialRegistrationFile1Error.innerText = '* Please attach a file';
    isValid = false;
} else {
    commercialRegistrationFile1Error.innerText = '';
}

return isValid;


}


// Function to reset trader registration form
function resetTraderRegistrationForm() {
    document.getElementById('companyName').value = '';
    document.getElementById('companyEmail').value = '';
    document.getElementById('companyAddress').value = '';
    document.getElementById('citySelect').value = '';
    document.getElementById('companyZip').value = '';
    document.getElementById('companyVat').value = '';
    document.getElementById('companyLicense').value = '';
    document.getElementById('traderName').value = '';
    document.getElementById('traderPhoneNumber').value = '';
    document.getElementById('traderAddress').value = '';
    document.getElementById('industrySelect').value = '';
    document.getElementById('idNumber').value = '';

    // Clear file input fields
    document.getElementById('commercialRegistrationFile1').value = '';
    document.getElementById('fileList1').innerHTML = '';

    document.getElementById('traderIDFile').value = '';
    document.getElementById('fileList2').innerHTML = '';


}

// Function to handle back button from trader company details
function backToWelcomeFromTraderForm() {
    // Hide the form container for trader registration
    document.getElementById('TraderRegistrationForm').style.display = 'none';

    // Show the welcome container
    document.getElementById('welcomeContainer').style.display = 'block';
    
    // Hide the points
    document.getElementById('point1').style.display = 'none';
    document.getElementById('point2').style.display = 'none';

    // Reset trader registration form
    resetTraderRegistrationForm();
}



function backToWelcomeFromTransportationForm() {
    // show the welcome container
    document.getElementById('welcomeContainer').style.display = 'block';


    // Hide the form container
    document.getElementById('transportationRegistrationForm').style.display = 'none';
    
    // Hide the points
    document.getElementById('point1').style.display = 'none';
    document.getElementById('point2').style.display = 'none';
}


//prevouis button of trader detials form

function backStep() {
    event.preventDefault(); 
    // Show the company details form when the user clicks "Back"
    document.getElementById('step1').style.display = 'flex';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('point1').classList.add('active'); // Add active class to point 1
    document.getElementById('point2').classList.remove('active'); // Remove active class from point 2
    currentStep = 1;
}


//next button - trader dtails form

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
    let traderIDFileInput = document.getElementById('traderIDFile');

    // Error message containers
    let nameError = document.getElementById('nameError');
    let phoneNumberError = document.getElementById('phoneNumberError');
    let addressError = document.getElementById('addressError');
    let industryError = document.getElementById('industryError');
    let idNumberError = document.getElementById('idNumberError');
    let traderIDFileError = document.getElementById('traderIDFileError');

    let isValid = true;

    // Validate trader name
    if (traderName.trim() === '') {
        nameError.innerText = '* Required';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(traderName)) {
        nameError.innerText = '* Trader name can only contain letters';
        isValid = false;
    } else {
        nameError.innerText = '';
    }

    // Validate phone number
    if (traderPhoneNumber.trim() === '') {
        phoneNumberError.innerText = '* Required';
        isValid = false;
    } else if (!/^(05)\d{8}$/.test(traderPhoneNumber)) {
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
    } else if (!((idNumber.length === 10 && /^[0-9]+$/.test(idNumber)) || (idNumber.length === 15 && /^[0-9]+$/.test(idNumber)))) {
        idNumberError.innerText = '* Invalid ID number format, national id : 10 numbers , iqama id : 15';
        isValid = false;
    } else {
        idNumberError.innerText = '';
    }

    // Validate attached files
    if (traderIDFileInput.files.length === 0) {
        traderIDFileError.innerText = '* Please attach a file';
        isValid = false;
    } else {
        traderIDFileError.innerText = '';
    }

    return isValid;
}

//trader form submition 
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
    let commercialRegistrationFile = document.getElementById('commercialRegistrationFile').value; 
    let traderName = document.getElementById("traderName").value;
    let traderPhoneNumber = document.getElementById("traderPhoneNumber").value;
    let traderAddress = document.getElementById("traderAddress").value;
    let industrySelect = document.getElementById("industrySelect").value;
    let idNumber = document.getElementById("idNumber").value;
    let traderIDFile = document.getElementById('traderIDFile').value;

 

    //AJAX request
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
            commercialRegistrationFile: commercialRegistrationFile, 
            traderName: traderName,
            traderPhoneNumber: traderPhoneNumber,
            traderAddress: traderAddress,
            industrySelect: industrySelect,
            idNumber: idNumber,
            traderIDFile: traderIDFile,
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
            window.location.href = data.redirectUrl;
            // Reset form fields
            //document.getElementById("TraderRegistrationForm").reset();

            fileList.innerHTML = ''; // Clear the file list
            fileList1.innerHTML = '';
            
            // Hide the "I'm Ready to Submit" button
            //document.getElementById("submitButton").style.display = 'none';
            
           
        }
    })
    .catch(function (error) {
        console.error(error);
    });
});



/*$(document).ready(function() {
    $('.select2').select2();
}); */





//next button for the company form

document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the "Next" button
    document.getElementById('nextButton2').addEventListener('click', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Call the function to validate trader details and proceed to the next step
        validateAndProceedToNextStep2();
    });
});

// Function to handle "Next" button click and validate trader details
function validateAndProceedToNextStep2() {
    // Validate trader details before proceeding
    if (validateTransportationForm()) {
        // Proceed to the next step
        document.getElementById('submit').style.display = 'block';
    }
}

function validateTransportationForm() {
    // Retrieve form field values
    let commercialRegistrationName = document.getElementById('commercialRegistrationName').value;
    let commercialRegistrationNumber = document.getElementById('commercialRegistrationNumber').value;
    let commercialRegistrationID = document.getElementById('commercialRegistrationID').value;
    let issueDate = document.getElementById('issueDate').value;
    let expirationDate = document.getElementById('expirationDate').value;
    let licenseType = document.getElementById('licenseType').value;
    let licenseNumber = document.getElementById('licenseNumber').value;
    let transportType = document.getElementById('transportType').value;
    let companySpecialization = document.getElementById('companySpecialization').value;

    // Retrieve error message elements
    let commercialRegistrationNameError = document.getElementById('commercialRegistrationNameError');
    let commercialRegistrationNumberError = document.getElementById('commercialRegistrationNumberError');
    let commercialRegistrationIDError = document.getElementById('commercialRegistrationIDError');
    let issueDateError = document.getElementById('issueDateError');
    let expirationDateError = document.getElementById('expirationDateError');
    let licenseTypeError = document.getElementById('licenseTypeError');
    let licenseNumberError = document.getElementById('licenseNumberError');
    let transportTypeError = document.getElementById('transportTypeError');
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

    // Validation logic for commercial registration name
    if (commercialRegistrationName.trim() === '') {
        commercialRegistrationNameError.innerText = '* Required';
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(commercialRegistrationName)) {
        commercialRegistrationNameError.innerText = '* Name Should contain only letters';
        isValid = false;
    } else {
        commercialRegistrationNameError.innerText = '';
    }

    // Validation logic for commercial registration number
    if (commercialRegistrationNumber.trim() === '') {
        commercialRegistrationNumberError.innerText = '* Required';
        isValid = false;
    } else if (!/^\d{10}$/.test(commercialRegistrationNumber)) {
        commercialRegistrationNumberError.innerText = '* Should contain exactly 10 numbers';
        isValid = false;
    } else {
        commercialRegistrationNumberError.innerText = '';
    }

    // Validation logic for commercial registration ID
    if (commercialRegistrationID.trim() === '') {
        commercialRegistrationIDError.innerText = '* Required';
        isValid = false;
    } else if (!/^\d{10}$/.test(commercialRegistrationID)) {
        commercialRegistrationIDError.innerText = '* Should contain exactly 10 numbers';
        isValid = false;
    } else {
        commercialRegistrationIDError.innerText = '';
    }

    // Validation logic for issue date and expiration date
    if (new Date(expirationDate) < new Date(issueDate)) {
        issueDateError.innerText = '* Issue Date cant be after Expiration Date';
        expirationDateError.innerText = '* Expiration Date cant be before Issue Date';
        isValid = false;
    } else {
        issueDateError.innerText = '';
        expirationDateError.innerText = '';
    }

    // Validation logic for license number
    if (licenseNumber.trim() === '') {
        licenseNumberError.innerText = '* Required';
        isValid = false;
    } else if (!/^\d{10}$/.test(licenseNumber)) {
        licenseNumberError.innerText = '* Should contain exactly 10 numbers';
        isValid = false;
    } else {
        licenseNumberError.innerText = '';
    }

    // Validation logic for license type
    if (licenseType === '') {
        licenseTypeError.innerText = '* Required';
        isValid = false;
    } else {
        licenseTypeError.innerText = '';
    }

    // Validation logic for transportation activity
    if (transportType === '') {
        transportTypeError.innerText = '* Required';
        isValid = false;
    } else {
        transportTypeError.innerText = '';
    }

    // Validation logic for company specialization
    if (companySpecialization.trim() === '') {
        companySpecializationError.innerText = '* Required';
        isValid = false;
    } else {
        companySpecializationError.innerText = '';
    }

    // Validation logic for file attachments
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

    return isValid;
}



const msg2 = document.getElementById("msg2");

document.getElementById("transportationRegistrationForm").addEventListener("submit", function (e) {
    // Prevent default form submission
    e.preventDefault();

    msg2.innerHTML = '';



    // Read user input
    let commercialRegistrationName = document.getElementById("commercialRegistrationName").value;
    let commercialRegistrationNumber = document.getElementById("commercialRegistrationNumber").value;
    let commercialRegistrationID = document.getElementById("commercialRegistrationID").value;
    let issueDate = document.getElementById("issueDate").value;
    let expirationDate = document.getElementById("expirationDate").value;
    let licenseType = document.getElementById("licenseType").value;
    let licenseNumber = document.getElementById("licenseNumber").value;
    let transportType = document.getElementById("transportType").value;
    let companySpecialization = document.getElementById("companySpecialization").value;

    //files

    let commercialRegistrationFile = document.getElementById("commercialRegistrationFile").value;
    let ownerIdFile = document.getElementById("ownerIdFile").value;
    let licenseFile = document.getElementById("licenseFile").value;
    let commissionerIdFile = document.getElementById("commissionerIdFile").value;

    // AJAX request
    fetch("/process1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            commercialRegistrationName: commercialRegistrationName,
            commercialRegistrationNumber: commercialRegistrationNumber,
            commercialRegistrationID: commercialRegistrationID,
            issueDate: issueDate,
            expirationDate: expirationDate,
            licenseType: licenseType,
            licenseNumber: licenseNumber,
            transportType: transportType,
            companySpecialization: companySpecialization,
            commercialRegistrationFile: commercialRegistrationFile,
            ownerIdFile: ownerIdFile,
            licenseFile: licenseFile,
            commissionerIdFile: commissionerIdFile,


        }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.errors) {
            data.errors.forEach(error => {
                const li2 = document.createElement('li');
                li.textContent = error.msg2;
                msg2.appendChild(li2);
            });
        } else {
            // Reset form fields
            window.location.href = data.redirectUrl;
        }
    })
    .catch(function (error) {
        console.error(error);
    });
});