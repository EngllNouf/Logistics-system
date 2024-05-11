/*document.querySelector('.configTruck-form').addEventListener("submit", function (e) {

  //prevent form submission
  e.preventDefault();

  //reading user input
  let Owner = document.getElementsByName("Owner")[0].value;
  let OwnerID = document.getElementsByName("OwnerID")[0].value;
  let formOwnerIDFile = document.getElementsByName("formOwnerIDFile")[0].value;
  let user = document.getElementsByName("user")[0].value;
  let userID = document.getElementsByName("userID")[0].value;
  let formUserIDFile = document.getElementsByName("formUserIDFile")[0].value;
  
  let LicensePlate = document.getElementsByName("LicensePlate")[0].value;
  let VehicleChassis = document.getElementsByName("VehicleChassis")[0].value;
  let RegistrationType = document.getElementsByName("RegistrationType")[0].value;
  let VehicleBrand = document.getElementsByName("VehicleBrand")[0].value;
  let VehicleModel = document.getElementsByName("VehicleModel")[0].value;
  let Colour = document.getElementsByName("Colour")[0].value;
  let ManufactureYear = document.getElementsByName("ManufactureYear")[0].value;
  let Serial_number = document.getElementsByName("Serial_number")[0].value;
  
  let insurance_start = document.getElementsByName("insurance_start")[0].value;
  let insurance_end = document.getElementsByName("insurance_end")[0].value;
  let inspection_start = document.getElementsByName("inspection_start")[0].value;
  let inspection_end = document.getElementsByName("inspection_end")[0].value;
  
  let formVehicleRegistrationFile = document.getElementsByName("formVehicleRegistrationFile")[0].value;
  let formVehiclePhotoFile = document.getElementsByName("formVehiclePhotoFile")[0].value;

  //sending AJAX request
  fetch("/process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      Owner:Owner, OwnerID:OwnerID, formOwnerIDFile:formOwnerIDFile, user:user, userID:userID, formUserIDFile:formUserIDFile,

      LicensePlate:LicensePlate, VehicleChassis:VehicleChassis, RegistrationType:RegistrationType, VehicleBrand:VehicleBrand, 
      VehicleModel:VehicleModel, Colour:Colour, ManufactureYear:ManufactureYear, Serial_number:Serial_number,

      insurance_start:insurance_start, insurance_end:insurance_end, inspection_start:inspection_start, inspection_end:inspection_end,

      formVehicleRegistrationFile:formVehicleRegistrationFile, formVehiclePhotoFile:formVehiclePhotoFile
    }),
  })
  .then(function (response) {
    if (response.ok) {
      //parsing
      return response.json();
    } else {
      throw new Error("Ops, we have a problem connecting to our backend.");
    }
  })
  .then(function (result) {
    if (result.status) {
      //print okay message
      document.getElementById("msg").innerHTML =
        "<span style='color:green'>Thank you, your message has been received.</span>";
    } else {
      throw new Error(result.err);
    }
  })
  .catch(function (error) {
    document.getElementById("msg").innerHTML =
      "<span style='color:red'>" + error + "</span>";
  });
});
*/


//Validation
const msg = document.getElementById("msg");
document.querySelector('.configTruck-form').addEventListener("submit", function (e) {
  
  //prevent form submission امنع العمليةالطبيعية لسكشن الفورم الي هو يفتح صفحة جديدة 
  e.preventDefault();

  msg.innerHTML=''

  //reading user input
  let Owner = document.getElementsByName("Owner")[0].value;
  let OwnerID = document.getElementsByName("OwnerID")[0].value;
  let formOwnerIDFile = document.getElementsByName("formOwnerIDFile")[0].value;
  let user = document.getElementsByName("user")[0].value;
  let userID = document.getElementsByName("userID")[0].value;
  let formUserIDFile = document.getElementsByName("formUserIDFile")[0].value;
  
  let LicensePlate = document.getElementsByName("LicensePlate")[0].value;
  let VehicleChassis = document.getElementsByName("VehicleChassis")[0].value;
  let RegistrationType = document.getElementsByName("RegistrationType")[0].value;
  let VehicleBrand = document.getElementsByName("VehicleBrand")[0].value;
  let VehicleModel = document.getElementsByName("VehicleModel")[0].value;
  let Colour = document.getElementsByName("Colour")[0].value;
  let ManufactureYear = document.getElementsByName("ManufactureYear")[0].value;
  let Serial_number = document.getElementsByName("Serial_number")[0].value;
  
  let insurance_start = document.getElementsByName("insurance_start")[0].value;
  let insurance_end = document.getElementsByName("insurance_end")[0].value;
  let inspection_start = document.getElementsByName("inspection_start")[0].value;
  let inspection_end = document.getElementsByName("inspection_end")[0].value;
  
  let formVehicleRegistrationFile = document.getElementsByName("formVehicleRegistrationFile")[0].value;
  let formVehiclePhotoFile = document.getElementsByName("formVehiclePhotoFile")[0].value;

  
  //sending AJAX request
  fetch("/configTruck", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",//object json
    },
    body: JSON.stringify({ 
      Owner:Owner, OwnerID:OwnerID, formOwnerIDFile:formOwnerIDFile, user:user, userID:userID, formUserIDFile:formUserIDFile,

      LicensePlate:LicensePlate, VehicleChassis:VehicleChassis, RegistrationType:RegistrationType, VehicleBrand:VehicleBrand, 
      VehicleModel:VehicleModel, Colour:Colour, ManufactureYear:ManufactureYear, Serial_number:Serial_number,

      insurance_start:insurance_start, insurance_end:insurance_end, inspection_start:inspection_start, inspection_end:inspection_end,

      formVehicleRegistrationFile:formVehicleRegistrationFile, formVehiclePhotoFile:formVehiclePhotoFile
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      if(data.errors){
         data.errors.forEach(error => {
          const li = document.createElement('li')
          li.textContent = error.msg
          msg.appendChild(li)
        });
      }

    })
    .catch(function (error) {


  });
});