const plusButtons = document.querySelectorAll(".plus");
const minusButtons = document.querySelectorAll(".minus");
const numElements = document.querySelectorAll(".num");
const inputElement = document.querySelector("#numberOfTruck");

plusButtons.forEach((button) => {
button.addEventListener("click", function() {
    const parentElement = this.closest(".form-element");
    const numElement = parentElement.querySelector(".num");
    
    let a = parseInt(numElement.innerText);
    a++;
    a = (a < 10) ? "0" + a : a;
    numElement.innerText = a;
    inputElement.value = a;
});
});

minusButtons.forEach((button) => {
button.addEventListener("click", function() {
    const parentElement = this.closest(".form-element");
    const numElement = parentElement.querySelector(".num");
    
    let a = parseInt(numElement.innerText);
    if (a > 1) {
    a--;
    a = (a < 10) ? "0" + a : a;
    numElement.innerText = a;
    inputElement.value = a;
    }
});
});