document.getElementById("formClose").addEventListener("click", deleteForm);

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