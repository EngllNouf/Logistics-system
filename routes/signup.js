const msg = document.getElementById("msg");

document.getElementById("signup").addEventListener("submit", function (e) {
  // Prevent form submission
  e.preventDefault();

  msg.innerHTML = '';

  // Reading user input
  let UserName = document.getElementsByName("UserName")[0].value;
  let Email = document.getElementsByName("Email")[0].value;
  let Password = document.getElementsByName("Password")[0].value;
  let ConfirmPassword = document.getElementsByName("ConfirmPassword")[0].value;

  // Sending AJAX request
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // JSON object
    },
    body: JSON.stringify({ UserName: UserName, Email: Email, Password: Password, ConfirmPassword: ConfirmPassword }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log response data

      if (data.errors) {
        data.errors.forEach((error) => {
          const li = document.createElement("li");
          li.textContent = error.msg;
          msg.appendChild(li);
        });
      } else if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    })
    .catch(function (error) {
      console.error("Error:", error); // Log error
    });
});
