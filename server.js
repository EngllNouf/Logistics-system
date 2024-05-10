const express = require("express");
const mysql = require("mysql2");
const { body, validationResult } = require("express-validator");
const path = require("path");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: "3306",
  database: "loginandsignup",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database");
});



// Serve static files
app.use("/", express.static("./website-logistics-system"));

app.get("/index.html", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the TraderRegistration folder
app.use("/TraderRegistration", express.static(path.join(__dirname, "TraderRegistration")));



app.post("/login", (req, res) => {
  const { UserName, Password } = req.body;

  // Check username and password in the database
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  connection.query(sql, [UserName, Password], (err, result) => {
    if (err) {
      console.error("Error executing the database query: " + err.stack);
      console.log("An error occurred while executing the database query.");
      return;
    }

    if (result.length === 0) {
      console.log("Invalid username or password.");
      return;
    }

    console.log("Login successful!");

    // Successfully logged in
    res.redirect("/index.html");
  });
});


// Signup route
app.post(
  "/signup",
  body("UserName").notEmpty().withMessage("Username is required"),
  body("Email").isEmail().withMessage("Invalid email"),
  body("Password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("ConfirmPassword").custom((value, { req }) => {
    if (value !== req.body.Password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { UserName, Email, Password, ConfirmPassword } = req.body;

    // Insert user data into the database
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    connection.query(sql, [UserName, Email, Password], (err, result) => {
      if (err) {
        console.error("Error inserting data into the database: " + err.stack);
        return res.status(500).json({
          status: false,
          error: "An error occurred while inserting data into the database.",
        });
      }

      // Registration successful, redirect to index page
      return res.redirect("/TraderRegistration/HTML/Registration.html");
    });
  }
);

// Logout route
app.get("/logout", (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session: " + err);
      return res.status(500).json({
        status: false,
        error: "An error occurred while destroying the session."
      });
    }
    res.redirect("/login.html");
  });
});



/////////////////////////////////////////////////////Registration///////////////////////////////////////////////////////////////////////
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
      body("companyName").notEmpty().withMessage("Company name is required"),
      body("companyEmail").isEmail().withMessage("Invalid email format"),
      body("companyAddress").notEmpty().withMessage("Company address is required"),
      body("citySelect").notEmpty().withMessage("City is required"),
      body("companyZip").isNumeric().isLength({ min: 5, max: 5 }).withMessage("Company ZIP must be 5 digits"),
      body("companyVat").isNumeric().isLength({ min: 15, max: 15 }).withMessage("Company VAT must be 15 digits"),
      body("companyLicense").isNumeric().isLength({ min: 10, max: 10 }).withMessage("Company license must be 10 digits"),
      body("traderName").isAlpha().withMessage("Trader name must contain only letters"),
      body("traderPhoneNumber").matches(/^05[0-9]{8}$/).withMessage("Invalid phone number format"),
      body("traderAddress").notEmpty().withMessage("Trader address is required"),
      body("industrySelect").notEmpty().withMessage("Industry selection is required"),
      body("idNumber").isNumeric().isLength({ min: 10, max: 10 }).withMessage("ID number must be 10 digits")
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
        body("commercialRegistrationName").notEmpty().withMessage("Commercial registration name is required"),
        body("commercialRegistrationNumber").isNumeric().withMessage("Commercial registration number must be numeric"),
        body("commercialRegistrationID").isNumeric().withMessage("Commercial registration ID must be numeric"),
        body("issueDate").isISO8601().withMessage("Invalid issue date format"),
        body("expirationDate").isISO8601().withMessage("Invalid expiration date format"),
        body("licenseType").notEmpty().withMessage("License type is required"),
        body("licenseNumber").isNumeric().withMessage("License number must be numeric"),
        body("transportType").notEmpty().withMessage("Transport type is required"),
        body("companySpecialization").notEmpty().withMessage("Company specialization is required")
    ];
}














const port = 8800;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});


