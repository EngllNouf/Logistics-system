const loginForm = document.getElementById("login");
const loginErrorMessage = document.getElementById("login-error-message");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let UserName = document.getElementsByName("UserName")[0].value;
    let Password = document.getElementsByName("Password")[0].value;

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserName: UserName, Password: Password }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Invalid username or password.");
        }
        return response.json();
    })
    .then((data) => {
        if (data.error) {
            loginErrorMessage.textContent = data.error;
            console.log("Login failed:", data.error);
        } else {
            window.location.href = "/index.html";
            console.log("Login successful!");
        }
    })
    .catch((error) => {
        loginErrorMessage.textContent = error.message;
        console.error("Error:", error);
    });
});


