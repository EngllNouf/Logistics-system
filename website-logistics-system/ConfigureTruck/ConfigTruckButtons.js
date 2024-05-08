//document.getElementById("addTruck-btn").addEventListener("click", createTruckForm);
document.getElementById("Check").addEventListener("click", enableConfirm);

/* Create an initial form when the page loads
document.addEventListener("DOMContentLoaded", function() {
    createTruckForm(); 
});*/

/*Makes a copy of original form
function createTruckForm() {
    var addFormPlace = document.getElementById('AddForm');
    var formBody = document.querySelector('.formBody');
    var clonedFormBody = formBody.cloneNode(true);
    clonedFormBody.style.display = 'block'; // Display the cloned form body
    addFormPlace.appendChild(clonedFormBody);
}*/

//confirm button is disabled till user checks the acknowledgement check box 
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

//Message when mouse hovers over confirm button 
document.getElementById("confirm-btn").addEventListener("mouseover", function() {
    var confirm = document.getElementById("confirm-btn");
  
    if (confirm.disabled) {
      confirm.textContent = "Please check the acknowledgement check box";
    }
  });
  
document.getElementById("confirm-btn").addEventListener("mouseout", function() {
    var confirm = document.getElementById("confirm-btn");
  
    if (confirm.disabled) {
      confirm.textContent = "Confirm";
    }
});


/*delete form
function deleteForm(event) {
    var deleteButton = event.target;
    var parentForm = deleteButton.closest("div");
  
    parentForm.remove();
}

 // Event delegation to handle delete button clicks
 document.addEventListener('click', function(event) {
    if (event.target && event.target.className === 'formClose') {
        deleteForm(event);
    }
});*/


/*document.getElementById("configTruck-form").addEventListener("submit", function(event) {
// Prevent the default form submission behavior
event.preventDefault();

// Redirect the user to another page
window.location.href = "/homePage";
});*/
