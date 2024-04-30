document.getElementById("addTruck-btn").addEventListener("click", createTruckForm);
document.getElementById("Check").addEventListener("click", enableConfirm);
document.getElementsByClassName("formClose").addEventListener("click", deleteForm);

function createTruckForm() {

    var addFormPlace = document.getElementById('AddForm');
    var formBody = document.querySelector('.formBody');

    addFormPlace.appendChild(formBody.cloneNode(true));
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

function deleteForm() {

    var deleteButton = document.getElementsByClassName("formClose")[0];
    var parentDiv = deleteButton.parentNode;
  
    parentDiv.remove();
}