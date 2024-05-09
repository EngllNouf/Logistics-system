const msg = document.getElementById("msg");
document.getElementById("myForm").addEventListener("submit", function (e) {
  //prevent form submission امنع العمليةالطبيعية لسكشن الفورم الي هو يفتح صفحة جديدة 
  e.preventDefault();

  msg.innerHTML=''

      //reading user input القيم الي يدخلها اليوزر
      let pickup = document.getElementsByName("pickup")[0].value;
      let dropOff = document.getElementsByName("dropOff")[0].value;
      let datePickUp = document.getElementsByName("datePickUp")[0].value;
      let dateDropOff = document.getElementsByName("dateDropOff")[0].value;
      let typeCargo = document.getElementsByName("typeCargo")[0].value;
      let truck = document.getElementsByName("truck")[0].value;
      let numberOfTruck = document.getElementsByName("numberOfTruck")[0].value;
      let goodsValue = document.getElementsByName("goodsValue")[0].value;
      let image = document.getElementsByName("image")[0].value;
      let notes = document.getElementsByName("notes")[0].value;
  
  //sending AJAX request
  fetch("/process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",//object json
    },
    body: JSON.stringify({ pickup: pickup, dropOff: dropOff, datePickUp: datePickUp, dateDropOff: dateDropOff,
      typeCargo: typeCargo, truck: truck, numberOfTruck: numberOfTruck, goodsValue: goodsValue,
      image: image, notes: notes
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
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
/*
*/

    });
});