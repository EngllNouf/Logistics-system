console.log("Hello")
const errorMessages = document.getElementById("login-error-message");

const form = document.getElementById("login").addEventListener("submit", function (e) {
    e.preventDefault();

    errorMessages.innerHTML=' '

    let UserName = document.getElementsByName("UserName")[0].value;
    let Password = document.getElementsByName("Password")[0].value;

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ UserName: UserName, Password: Password }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.errors) {
            data.errors.forEach((error) => {
                const li = document.createElement('li');
                li.textContent = error.msg;
                errorMessages.appendChild(li);
            })
        } else {
            console.log("Login successful!");
        }
    })
});