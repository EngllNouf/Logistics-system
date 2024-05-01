document.getElementById("addShipment-btn").addEventListener("click", createShipmentForm);

document.addEventListener("DOMContentLoaded", function() {
    createShipmentForm(); // Create an initial form when the page loads
});

function createShipmentForm() {
    var addFormPlace = document.getElementById('AddForm');
    var formBody = document.querySelector('.formBody');
    var clonedFormBody = formBody.cloneNode(true);
    clonedFormBody.style.display = 'block'; // Display the cloned form body
    addFormPlace.appendChild(clonedFormBody);
}