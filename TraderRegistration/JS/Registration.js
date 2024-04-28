let currentStep = 1; // Initialize current step

function selectOption(option) {
    // Hide the welcome container
    document.getElementById('welcomeContainer').style.display = 'none';

    // Show the form container only if the user selects "trader"
    if (option === 'trader') {
        // Add slide animation to cover the whole page
        document.querySelector('.form-container').classList.add('trader-slide-animation');

        // Show the form container after the animation is done
        setTimeout(() => {
            document.getElementById('formContainer').style.display = 'flex';
            // Show only the company details form initially
            document.getElementById('step1').style.display = 'flex';
            document.getElementById('step2').style.display = 'none';
            currentStep = 1;
        }, 300); // Adjust the delay according to your animation duration
    } else {
        // Hide the form container for other options
        document.getElementById('formContainer').style.display = 'none';
    }
}

function nextStep() {
    // Slide animation for transitioning to the next step
    document.getElementById('step' + currentStep).style.transform = 'translateX(-100%)';
    currentStep++;
    document.getElementById('step' + currentStep).style.transform = 'translateX(0)';

    // Update current step display
    document.getElementById('step' + (currentStep - 1)).style.display = 'none';
    document.getElementById('step' + currentStep).style.display = 'flex';
}

function backStep() {
    // Slide animation for transitioning to the previous step
    document.getElementById('step' + currentStep).style.transform = 'translateX(100%)';
    currentStep--;
    document.getElementById('step' + currentStep).style.transform = 'translateX(0)';

    // Update current step display
    document.getElementById('step' + (currentStep + 1)).style.display = 'none';
    document.getElementById('step' + currentStep).style.display = 'flex';
}



function submitForm() {
    
    //just  For demonstration
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('welcomeMessage').style.display = 'block';
  

    
}