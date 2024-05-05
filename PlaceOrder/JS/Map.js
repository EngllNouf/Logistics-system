
// Function to handle drop-off date selection 
function handleDropoffDate() {
    const pickupDate = new Date(document.getElementById('pickupDate').value);
    const dropoffDate = new Date(document.getElementById('dropoffDate').value);
    const timeDifference = dropoffDate.getTime() - pickupDate.getTime();
    const dayDifference = timeDifference / (1000 * 3600 * 24);

    if (dayDifference < 2) {
        document.getElementById('dropoffDate').value = ""; // Clear the drop-off date value
        document.getElementById('dateWarning').innerText = "Please select a drop-off date at least two days after the pickup date."; // Show a message under the drop-off date field
    } else {
        document.getElementById('dateWarning').innerText = ""; // Remove the message
    }
}