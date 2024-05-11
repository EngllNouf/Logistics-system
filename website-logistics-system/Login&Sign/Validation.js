document.addEventListener("DOMContentLoaded", function () {
    const signInBtn = document.querySelector("#sign-in-btn");
    const signUpBtn = document.querySelector("#sign-up-btn");
    const signInBtn2 = document.querySelector("#sign-in-btn2");
    const container = document.querySelector(".container");

    signInBtn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
    });

    signUpBtn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
    });

    signInBtn2.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
    });

    // Get the forms
    const signInForm = document.querySelector(".sign-in-form");
    const signUpForm = document.querySelector(".sign-up-form");

    // Add validation to both forms
    signInForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission
        validateForm(signInForm);
    });

    signUpForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission
        validateForm(signUpForm);
    });


    function validateForm(form) {
        const usernameInput = form.querySelector("input[type='text']");
        const passwordInput = form.querySelector("input[type='password']");
        const emailInput = form.querySelector("input[type='email']"); // For sign-up form
        const confirmPasswordInput = form.querySelector("input[type='password'][placeholder='Confirm Password']"); // For sign-up form

        let isValid = true;

        // Username validation
        const usernameError = validateUsername(usernameInput.value);
        if (usernameError) {
            showError(usernameInput, usernameError, usernameInput.parentElement);
            isValid = false;
        } else {
            removeError(usernameInput, usernameInput.parentElement);
        }

        // Password validation
        if (form === signInForm) {
            // Password validation for sign-in form
            const passwordError = validatePasswordSignIn(passwordInput.value);
            if (passwordError) {
                showError(passwordInput, passwordError, passwordInput.parentElement);
                isValid = false;
            } else {
                removeError(passwordInput, passwordInput.parentElement);
            }
        } else if (form === signUpForm) {
            // Password validation for sign-up form
            const passwordError = validatePasswordSignUp(passwordInput.value);
            if (passwordError) {
                showError(passwordInput, passwordError, passwordInput.parentElement);
                isValid = false;
            } else {
                removeError(passwordInput, passwordInput.parentElement);
            }
        }

        // Email validation (for sign-up form)
        if (form === signUpForm) {
            const emailError = validateEmail(emailInput.value);
            if (emailError) {
                showError(emailInput, emailError, emailInput.parentElement);
                isValid = false;
            } else {
                removeError(emailInput, emailInput.parentElement);
            }
        }

        // Confirm password validation (for sign-up form)
        if (form === signUpForm) {
            const confirmPasswordError = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
            if (confirmPasswordError) {
                showError(confirmPasswordInput, confirmPasswordError, confirmPasswordInput.parentElement);
                isValid = false;
            } else {
                removeError(confirmPasswordInput, confirmPasswordInput.parentElement);
            }
        }

        if (isValid) {
            // Form is valid, submit it
            form.submit();
        }
    }

    function validateUsername(username) {
        if (username.trim() === "") {
            return "Username cannot be empty.";
        } else if (username.length < 6) {
            return "Username must be at least 6 characters long.";
        } else {
            return ""; // Valid username
        }
    }

    function validatePasswordSignIn(password) {
        if (password.trim() === "") {
            return "Password cannot be empty.";
        } else {
            return ""; // Valid password for sign-in
        }
    }

    function validatePasswordSignUp(password) {
        if (password.trim() === "") {
            return "Password cannot be empty.";
        } else if (password.length < 8) {
            return "Password must be at least 8 characters long.";
        } else if (!hasNumber(password)) {
            return "Password must contain at least one number.";
        } else if (!hasSpecialChar(password)) {
            return "Password must contain at least one special character.";
        } else {
            return ""; // Valid password for sign-up
        }
    }

    function hasNumber(str) {
        return /\d/.test(str);
    }

    function hasSpecialChar(str) {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str);
    }

    function validateEmail(email) {
        if (email.trim() === "") {
            return "Email cannot be empty.";
        } else if (!validateEmailFormat(email)) {
            return "Please enter a valid email address.";
        } else {
            return ""; // Valid email
        }
    }

    function validateEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateConfirmPassword(password, confirmPassword) {
        if (confirmPassword.trim() === "") {
            return "Confirm password cannot be empty.";
        } else if (confirmPassword !== password) {
            return "Passwords do not match.";
        } else {
            return ""; // Valid confirmation
        }
    }

    function showError(input, message, parentElement) {
        const errorContainer = parentElement.querySelector(".error-message");
        if (!errorContainer) {
            const error = document.createElement("p");
            error.classList.add("error-message");
            error.textContent = message;
            parentElement.insertBefore(error, input.nextSibling);
        } else {
            errorContainer.textContent = message;
        }
        input.classList.add("error");
    }

    function removeError(input, parentElement) {
        const errorContainer = parentElement.querySelector(".error-message");
        if (errorContainer) {
            errorContainer.remove();
        }
        input.classList.remove("error");
    }
    
});