document.getElementById("addTruck-btn").addEventListener("click", createTruckForm);
document.getElementById("Check").addEventListener("click", enableConfirm);

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

