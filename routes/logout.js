// Assuming you're using fetch API or any AJAX library like Axios

function logout() {
    fetch('/logout', {
      method: 'GET', // Or 'POST', depending on your route setup
      credentials: 'same-origin' // Include cookies in the request if using sessions
    })
    .then(response => {
      if (response.ok) {
        // If logout successful, redirect the user to the login page
        window.location.href = '/login.html';
      } else {
        // Handle error response
        console.error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  