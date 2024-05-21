const errorMessages = document.getElementById("login-error-message");

document.getElementById("login").addEventListener("submit", function (e) {
    e.preventDefault();

    errorMessages.innerHTML=' '

    let UserName = document.getElementsByName("UserName")[0].value;
    let Password = document.getElementsByName("Password")[0].value;

    // Sending AJAX request
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ UserName: UserName, Password: Password }),
    })
    .then((response) => {
        if (response.ok) {
          console.log("Login successful!");
        } else {
          return response.json()
            .then((data) => {
              console.log(data);
              if (data.errors) {
                data.errors.forEach((error) => {
                  const li = document.createElement('li');
                  li.textContent = error.msg;
                  errorMessages.appendChild(li);
                });
              }
            });
        }
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
});


const errorMessagesSinUp = document.getElementById("signup-password-error-message");

document.getElementById("signup").addEventListener("submit", function (e) {
    e.preventDefault();

    errorMessagesSinUp.innerHTML=' '

  // Reading user input
  let UserName = document.getElementsByName("UserName")[1].value;
  let Email = document.getElementsByName("Email")[0].value;
  let Password = document.getElementsByName("Password")[1].value;

    // Sending AJAX request
    fetch("/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ UserName: UserName, Email: Email, Password: Password}),
    })
    .then((response) => {
        if (response.ok) {
          console.log("Login successful!");
        } else {
          return response.json()
            .then((data) => {
              console.log(data);
              if (data.errors) {
                data.errors.forEach((error) => {
                  const li = document.createElement('li');
                  li.textContent = error.msg;
                  errorMessagesSinUp.appendChild(li);
                });
              }
            });
        }
      })
      .catch((error) => {
        console.error("Error: " + error.message);
      });
});