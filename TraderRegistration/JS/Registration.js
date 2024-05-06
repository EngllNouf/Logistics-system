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
        
    } else {
        // Hide the form container for other options
        document.getElementById('formContainer').style.display = 'none';
    }
}



function nextStep() {
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
    // Show the company details form when the user clicks "Back"
    document.getElementById('step1').style.display = 'flex';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('point1').classList.add('active'); // Add active class to point 1
    document.getElementById('point2').classList.remove('active'); // Remove active class from point 2
    currentStep = 1;
}


function submitForm() {
    // Get form fields
    const traderName = document.getElementById('traderName').value;
    const traderPhoneNumber = document.getElementById('traderPhoneNumber').value;
    const traderAddress = document.getElementById('traderAddress').value;
    const industrySelect = document.getElementById('industrySelect');
    const idNumber = document.getElementById('idNumber').value;
    const fileInput = document.getElementById('fileInput2');
    const fileList = document.getElementById('fileList2');
    const fileError = document.getElementById('fileError2');

    // Error message containers
    const nameError = document.getElementById('nameError');
    const phoneNumberError = document.getElementById('phoneNumberError');
    const addressError = document.getElementById('addressError');
    const industryError = document.getElementById('industryError');
    const idNumberError = document.getElementById('idNumberError');

    let isValid = true;

    // Validate trader name
    if (traderName.trim() === '') {
        nameError.innerText = '* Required';
        isValid = false;
        setTimeout(() => {
            nameError.innerText = '';
        }, 4000);
    } else if (!validateTraderName(traderName)) {
        nameError.innerText = '* Trader name can only contain letters';
        isValid = false;
        setTimeout(() => {
            nameError.innerText = '';
        }, 4000);
    } else {
        nameError.innerText = '';
    }

    // Validate phone number
    if (traderPhoneNumber.trim() === '') {
        phoneNumberError.innerText = '* Required';
        isValid = false;
        setTimeout(() => {
            phoneNumberError.innerText = '';
        }, 4000);
    } else if (!validatePhoneNumber(traderPhoneNumber)) {
        phoneNumberError.innerText = '* Invalid phone number format example : 05********';
        isValid = false;
        setTimeout(() => {
            phoneNumberError.innerText = '';
        }, 5000);
    } else {
        phoneNumberError.innerText = '';
    }


    // Validate address
    if (traderAddress.trim() === '') {
        addressError.innerText = '* Required';
        isValid = false;
        setTimeout(() => {
            addressError.innerText = '';
        }, 4000);
    } else {
        addressError.innerText = '';
    }

    // Validate industry
    if (industrySelect.value === '') {
        industryError.innerText = '* Required';
        isValid = false;
        setTimeout(() => {
            industryError.innerText = '';
        }, 4000);
    } else {
        industryError.innerText = '';
    }

    // Validate ID number
    if (idNumber.trim() === '') {
        idNumberError.innerText = '* Required';
        isValid = false;
        setTimeout(() => {
            idNumberError.innerText = '';
        }, 4000);
    } else if (!validateIdNumber(idNumber)) {
        idNumberError.innerText = '* Invalid ID number format , national id : 10 numbers , iqama : 15';
        isValid = false;
        setTimeout(() => {
            idNumberError.innerText = '';
        }, 4000);
    } else {
        idNumberError.innerText = '';
    }

    // Validate attached files
    if (fileInput.files.length === 0) {
        fileError.innerText = '* Please attach a file';
        isValid = false;
        setTimeout(() => {
            fileError.innerText = '';
        }, 4000);
    } else {
        fileError.innerText = '';
    }

    // If all fields are valid, show success message
    if (isValid) {
        // Hide the points and the form
        document.getElementById('point1').style.display = 'none';
        document.getElementById('point2').style.display = 'none';
        document.getElementById('step2').style.display = 'none';

        // Show success message
        document.getElementById('successMessage').innerText = 'Successful Registration';
        document.getElementById('successMessage').style.display = 'block';

     
        setTimeout(function() {
            document.getElementById('successMessage').style.display = 'none';
          
            window.location.href = "file:///C:/Users/96656/OneDrive/%D8%B3%D8%B7%D8%AD%20%D8%A7%D9%84%D9%85%D9%83%D8%AA%D8%A8/Logistics-system/Trader/Trader.html"; // Change the URL to your "place order" page
        }, 4000); 
    }
}



$(document).ready(function() {
    $('.select2').select2();
});

function validateStep1() {
    const companyName = document.getElementById('companyName').value;
    const companyEmail = document.getElementById('companyEmail').value;
    const companyAddress = document.getElementById('companyAddress').value;
    const citySelect = document.getElementById('citySelect');
    const companyZip = document.getElementById('companyZip').value;
    const companyVat = document.getElementById('companyVat').value;
    const companyLicense = document.getElementById('companyLicense').value;
  

    // Error message containers
    const companyNameError = document.getElementById('companyNameError');
    const companyEmailError = document.getElementById('companyEmailError');
    const AddressError = document.getElementById('AddressError');
    const citySelectError = document.getElementById('citySelectError');
    const ZipError = document.getElementById('ZipError');
    const VatError = document.getElementById('VatError');
    const LicenseError = document.getElementById('LicenseError');
    // Add more error message variables for other fields
    const fileList1 = document.getElementById('fileList1');
    const fileInput1 = document.getElementById('fileInput1');
    const fileError1 = document.getElementById('fileError1');

    let isValid = true;

    // Validate Company Name
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
    // Use a regular expression to check if the VAT number contains only 15 digits
    const vatRegex = /^\d{15}$/;
    return vatRegex.test(vatNumber);
}
function validateLicenseNumber(licenseNumber) {
    // Use a regular expression to check if the license number contains only 10 digits
    const licenseRegex = /^\d{10}$/;
    return licenseRegex.test(licenseNumber);
}
function validateEmail(email) {
    // Use a regular expression to check if the email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


function validateZip(zipCode) {
    // Use a regular expression to check if the ZIP code contains only 5 digits
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zipCode);
}

function validatePhoneNumber(phoneNumber) {
    // Use a regular expression to check if the phone number format is valid
    const phoneRegex = /^05\d{8}$/;
    return phoneRegex.test(phoneNumber);
}

function validateIdNumber(idNumber) {
    // Use a regular expression to check if the ID number format is valid
    const saudiIdRegex = /^\d{10}$/;
    const iqamaIdRegex = /^\d{15}$/;
    
    // Check if it matches either Saudi ID or Iqama ID format
    return saudiIdRegex.test(idNumber) || iqamaIdRegex.test(idNumber);
}

function validateTraderName(traderName) {
    // Use a regular expression to check if the trader's name contains only letters
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(traderName);
}





