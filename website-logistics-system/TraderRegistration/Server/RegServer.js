
// Import required modules
const express = require("express");
const mysql = require("mysql2");
const { check, validationResult } = require("express-validator");
const app = express();


// Serve static files from the 'public' directory
app.use(express.static("./TraderReg"));


app.use(express.urlencoded({extended:false}));

//we use json
app.use(express.json());

// validation functions one for trader , one for transportation company
let formValidationTrader = getFormValidation(); 
let formValidationTransport = getFormValidationTransportation();

//trader registration form route

app.post("/process",formValidationTrader, (request, response) => {
 
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({errors:errors.array()})
  } else {
        /// if no errors send the varibles to addtrader function
        const companyName = request.body.companyName;
        const companyEmail = request.body.companyEmail;
        const companyAddress = request.body.companyAddress;
        const citySelect = request.body.citySelect;
        const companyZip = request.body.companyZip;
        const companyVat = request.body.companyVat;
        const companyLicense = request.body.companyLicense;
        const commercialRegistrationFile1 = request.body.commercialRegistrationFile1;
        const traderName = request.body.traderName;
        const traderPhoneNumber = request.body.traderPhoneNumber;
        const traderAddress = request.body.traderAddress;
        const industrySelect = request.body.industrySelect;
        const idNumber = request.body.idNumber;
        const traderIDFile = request.body.traderIDFile;
        addTrader(companyName, companyEmail, companyAddress,citySelect,companyZip,companyVat,
            companyLicense,commercialRegistrationFile1,traderName,traderPhoneNumber,traderAddress,industrySelect,idNumber,traderIDFile);
       response.status(200).json({msg:"Form is validated"});
   }
 });
 
 
 function addTrader(companyName, companyEmail, companyAddress, citySelect, companyZip, companyVat, companyLicense, commercialRegistrationFile1, traderName, traderPhoneNumber, traderAddress, industrySelect, idNumber, traderIDFile) {
    

    //connect to database
    const mysql = require("mysql2");
    let db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      port: "3306",
      database: "registrationinfo",
    });
  
    db.connect(function (err) {
      
    //insert into database    
      let sql = `INSERT INTO trader (idNumber,companyName, companyEmail, companyAddress, citySelect, companyZip, companyVat, companyLicense, commercialRegistrationFile1, traderName, traderPhoneNumber, traderAddress, industrySelect, traderIDFile ) VALUES 
      ('${idNumber}' , '${companyName}', '${companyEmail}', '${companyAddress}', '${citySelect}', '${companyZip}', '${companyVat}', '${companyLicense}', '${commercialRegistrationFile1}', '${traderName}', '${traderPhoneNumber}', '${traderAddress}', '${industrySelect}', '${traderIDFile}')`;
      db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("trader record has been added");
    
        db.end();
      });
    });



    
    
  }

  function getFormValidation() {
    return [
      check("companyName").notEmpty().withMessage("Company name is required"),
      check("companyEmail").isEmail().withMessage("Invalid email format"),
      check("companyAddress").notEmpty().withMessage("Company address is required"),
      check("citySelect").notEmpty().withMessage("City is required"),
      check("companyZip").isNumeric().isLength({ min: 5, max: 5 }).withMessage("Company ZIP must be 5 digits"),
      check("companyVat").isNumeric().isLength({ min: 15, max: 15 }).withMessage("Company VAT must be 15 digits"),
      check("companyLicense").isNumeric().isLength({ min: 10, max: 10 }).withMessage("Company license must be 10 digits"),
      check("traderName").isAlpha().withMessage("Trader name must contain only letters"),
      check("traderPhoneNumber").matches(/^05[0-9]{8}$/).withMessage("Invalid phone number format"),
      check("traderAddress").notEmpty().withMessage("Trader address is required"),
      check("industrySelect").notEmpty().withMessage("Industry selection is required"),
      check("idNumber").isNumeric().isLength({ min: 10, max: 10 }).withMessage("ID number must be 10 digits")
    ];
  }
  

  // transportation registration route
  
  
  app.post("/process1", formValidationTransport, (request, response) => {
    const errors2 = validationResult(request);
    if (!errors2.isEmpty()) {
        return response.status(422).json({errors2: errors2.array()});
    } else {
        // No errors
        const commercialRegistrationName = request.body.commercialRegistrationName;
        const commercialRegistrationNumber = request.body.commercialRegistrationNumber;
        const commercialRegistrationID = request.body.commercialRegistrationID;
        const issueDate = request.body.issueDate;
        const expirationDate = request.body.expirationDate;
        const licenseType = request.body.licenseType;
        const licenseNumber = request.body.licenseNumber;
        const transportType = request.body.transportType;
        const companySpecialization = request.body.companySpecialization;

        // Handle file attachments
        const commercialRegistrationFile = request.body.commercialRegistrationFile; 
        const ownerIdFile = request.body.ownerIdFile; 
        const licenseFile = request.body.licenseFile; 
        const commissionerIdFile = request.body.commissionerIdFile; 

        addTransportationCompany(commercialRegistrationName, commercialRegistrationNumber, commercialRegistrationID,
            issueDate, expirationDate, licenseType, licenseNumber, transportType, companySpecialization,
            commercialRegistrationFile, ownerIdFile, licenseFile, commissionerIdFile);
        
        response.status(200).json({msg: "Form is validated"});
    }
});

function addTransportationCompany(commercialRegistrationName, commercialRegistrationNumber, commercialRegistrationID,
    issueDate, expirationDate, licenseType, licenseNumber, transportType, companySpecialization,
    commercialRegistrationFile, ownerIdFile, licenseFile, commissionerIdFile) {
    // Database connection
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        port: "3306",
        database: "registrationinfo",
    });

    db.connect(function (err) {
        // Data to be inserted into the database
        const sql = `INSERT INTO transportationcompany (commercialRegistrationID, commercialRegistrationName, commercialRegistrationNumber,
            issueDate, expirationDate, licenseType, licenseNumber, transportType,
            companySpecialization, commercialRegistrationFile, ownerIdFile, licenseFile, commissionerIdFile) VALUES 
            ('${commercialRegistrationID}', '${commercialRegistrationName}', '${commercialRegistrationNumber}', '${issueDate}' ,'${expirationDate}', '${licenseType}', '${licenseNumber}', '${transportType}', '${companySpecialization}', '${commercialRegistrationFile}', '${ownerIdFile}', '${licenseFile}', '${commissionerIdFile}')`;
        
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Transportation company record has been added");
            db.end(); // Close the database connection
        });
    });
}

function getFormValidationTransportation() {
    return [
        check("commercialRegistrationName").notEmpty().withMessage("Commercial registration name is required"),
        check("commercialRegistrationNumber").isNumeric().withMessage("Commercial registration number must be numeric"),
        check("commercialRegistrationID").isNumeric().withMessage("Commercial registration ID must be numeric"),
        check("issueDate").isISO8601().withMessage("Invalid issue date format"),
        check("expirationDate").isISO8601().withMessage("Invalid expiration date format"),
        check("licenseType").notEmpty().withMessage("License type is required"),
        check("licenseNumber").isNumeric().withMessage("License number must be numeric"),
        check("transportType").notEmpty().withMessage("Transport type is required"),
        check("companySpecialization").notEmpty().withMessage("Company specialization is required")
    ];
}

  
// Start the server
const PORT = process.env.PORT || 3006;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

