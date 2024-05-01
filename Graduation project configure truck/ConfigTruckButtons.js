document.getElementById("addTruck-btn").addEventListener("click", createTruckForm);
document.getElementById("Check").addEventListener("click", enableConfirm);
document.getElementById("formClose").addEventListener("click", deleteForm);

document.addEventListener("DOMContentLoaded", function() {
    createTruckForm(); // Create an initial form when the page loads
});

function createTruckForm() {
    var addFormPlace = document.getElementById('AddForm');
    var formBody = document.querySelector('.formBody');
    var clonedFormBody = formBody.cloneNode(true);
    clonedFormBody.style.display = 'block'; // Display the cloned form body
    addFormPlace.appendChild(clonedFormBody);
}

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
});
