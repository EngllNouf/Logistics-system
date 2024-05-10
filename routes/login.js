const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", function (e) {
  // Prevent the default form submission
  e.preventDefault();

  // Get user input
  let UserName = document.getElementsByName("UserName")[0].value;
  let Password = document.getElementsByName("Password")[0].value;

  // Sending AJAX request
  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ UserName: UserName, Password: Password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        // Display error message
        msg.textContent = data.error;
        console.log("Login failed:", data.error); // Log login failure
      } else {
        // Redirect to the home page
        window.location.href = "/index.html";
        console.log("Login successful!"); // Log login success
      }
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
});
