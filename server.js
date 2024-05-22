const express = require("express");
const mysql = require("mysql2");
const { body, validationResult } = require("express-validator");
const path = require("path");
const session = require("express-session");
const { request } = require("http");
const app = express();
const temporaryStorage = {};
// Set up sessions
app.use(session({
  secret: 'Nougor181', // Change this to a long random string
  resave: false,
  saveUninitialized: true
}));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: "3306",
  database: "naqel_limited_company",
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

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());


// Serve static files from the TraderRegistration folder
app.use("/TraderRegistration", express.static(path.join(__dirname, "TraderRegistration")));


app.post("/login", (req, res) => {
  const { UserName, Password } = req.body;

  // Validate input
  if (!UserName || !Password) {
    console.log("Please provide a username and password.");
    return res.status(400);
  }

  // Sanitize input
  const sanitizedUserName = UserName.trim();
  const sanitizedPassword = Password.trim();

  // Check username and password in the database
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  connection.query(sql, [sanitizedUserName, sanitizedPassword], (err, result) => {
    if (err) {
      console.error("Error executing the database query: " + err.stack);
      console.log("An error occurred while executing the database query.");
      return res.status(500);
    }

    if (result.length === 0) {
      console.log("Invalid username or password.");
      return res.status(401);
      
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
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    const { UserName, Email, Password, ConfirmPassword } = req.body;

    // Insert user data into the database
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    connection.query(sql, [UserName, Email, Password], (err, result) => {
      if (err) {
        console.log("Error inserting data into the database");
        //console.error("Error inserting data into the database: " + err.stack);
          return res.status(500)
          //.json({
        //   status: false,
        //   error: "An error occurred while inserting data into the database.",
        // });
      }

      temporaryStorage.username = UserName;

      // Registration successful, redirect to index page
      return res.redirect("/TraderRegistration/HTML/Registration.html");
    });
  }
);




app.post("/logout", (req, res) => {
  userLoggedIn = false;
  res.redirect("/login.html");
});


/////////////////////////////////////////////////////Registration///////////////////////////////////////////////////////////////////////
// validation functions one for trader , one for transportation company
let formValidationTrader = getFormValidationTrader(); 
let formValidationTransport = getFormValidationTransportation();

//trader registration form route

app.post("/process",formValidationTrader, (request, response) => {
 
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(422).json({errors:errors.array()})
  } else {
        /// if no errors send the varibles to addtrader function

        const { username } = temporaryStorage;
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
            companyLicense,commercialRegistrationFile1,traderName,traderPhoneNumber,traderAddress,industrySelect,idNumber,traderIDFile,username);
            delete temporaryStorage.username;
       response.status(200).json({msg:"Form is validated"});
        
   }
 });
 
 
 function addTrader(companyName, companyEmail, companyAddress, citySelect, companyZip, companyVat, companyLicense, commercialRegistrationFile1, traderName, traderPhoneNumber, traderAddress, industrySelect, idNumber, traderIDFile, username) {
    

    //connect to database
    const mysql = require("mysql2");
    let db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      port: "3306",
      database: "naqel_limited_company",
    });
  
    db.connect(function (err) {
      
    //insert into database    
      let sql = `INSERT INTO trader (idNumber,companyName, companyEmail, companyAddress, citySelect, companyZip, companyVat, companyLicense, commercialRegistrationFile1, traderName, traderPhoneNumber, traderAddress, industrySelect, traderIDFile, username) VALUES 
      ('${idNumber}' , '${companyName}', '${companyEmail}', '${companyAddress}', '${citySelect}', '${companyZip}', '${companyVat}', '${companyLicense}', '${commercialRegistrationFile1}', '${traderName}', '${traderPhoneNumber}', '${traderAddress}', '${industrySelect}', '${traderIDFile}','${username}')`;
      db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("trader record has been added");
    
        db.end();
       


      });
    });



    
    
  }

  function getFormValidationTrader() {
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
        
        response.status(200).json({msg: "Form is validated", redirectUrl: "/Trader/Trader.html"});
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
        database: "naqel_limited_company",
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



//////////////////////////////////////////PLACE ORDER///////////////////////////////////////////////////
//JSON routing
let formValidationOrder = getFormValidationOrderDetails(); // ميثود يشيك اذا فيه اخطاء او لا والنتيجة ترجع فيه
app.use(express.urlencoded({extended:false}));
app.use(express.json());// نفعل وضعية json
app.post("/order",formValidationOrder, (request, response) => {// formValidation يسمح لنا نستخدم الميثود
  //reading form data
  //POST = request.body.name
//   //GET = request.query.name
  const errors = validationResult(request);
  if (!errors.isEmpty()) {//هل الايرور فاضي او مو فاضي
    return response.status(422).json({errors:errors.array()})//ارجعله المسج
  } else {
        ///no errors
        const pickup = request.body.pickup;
        const dropOff = request.body.dropOff;
        const datePickUp = request.body.datePickUp;
        const dateDropOff = request.body.dateDropOff;
        const typeCargo = request.body.typeCargo;
        const truck = request.body.truck;
        const numberOfTruck = request.body.numberOfTruck;
        const CargoValue = request.body.CargoValue;
        const weight = request.body.weight;
        const image = request.body.image;
        const notes = request.body.notes;
        addOrder(pickup, dropOff, datePickUp,dateDropOff,typeCargo,truck,
          numberOfTruck,CargoValue,weight,image,notes);
          response.status(200).json({msg: "Form is validated", redirectUrl: "/Trader/Trader.html"});
   }
 });


function getFormValidationOrderDetails() {//فانكشن يرجع اوبجيكت 
  return [
    body("pickup").notEmpty().withMessage("Please enter the pick-up location.")
      .isLength({ min: 3, max: 100 })
      .withMessage("The length should be between 3 and 100 characters.")
      .matches(/[\u0600-\u06FF\u0660-\u0669a-zA-Z,\/\s]/) //format
      /**[\u0600-\u06FF] matches the Arabic language.
        [\u0660-\u0669] matches Arabic numerals.
        [a-zA-Z] corresponds to the Latin lowercase and uppercase.
        ,\ matches the agreement partner.
        \s Matches any nearby distance. */
      .withMessage("Please enter location correctly.You can use Arabic and English letters, as well as comma (,) and slash (/) only."),
    body("dropOff").notEmpty().withMessage("Please enter the dropOff location.")
      .isLength({ min: 3, max: 100 })
      .withMessage("The length should be between 3 and 100 characters.")
      .matches(/[\u0600-\u06FF\u0660-\u0669a-zA-Z,\/\s]/) //format
      .withMessage("Please enter location correctly.You can use Arabic and English letters, as well as comma (,) and slash (/) only."),

      body("datePickUp")
        .isAfter(new Date().toLocaleDateString())
        .withMessage("Please enter a date after today for the pick-up date."),
      body("dateDropOff")
        .custom((value, { req }) => {
          const pickUpDate = new Date(req.body.datePickUp);
          const dropOffDate = new Date(value);
          if (dropOffDate < pickUpDate) {
            throw new Error("The drop-off date cannot be before the pick-up date.");
          }
          return true;
        }),
    body("truck")
    //نسوي الكود الي احنا نباه نستخدم ميثود custom
      .custom((val) => {
        const whitelist = ["DieselTankTruck", "WaterTankTruck", "petrolTankTruck","TipperTruck","RefrigeratedTruck","FreezerTruck",
          "ContainerTruck","CarCarrier","FlatbedTruck","LowbedHydraulic","HighSidesTruck","ShortSidesTruck","CurtainTruck","Lowbed","BulkerTrack"
        ];
        if (whitelist.includes(val)) return true;//ميثود جاهز whitelist
        return false;
      })
      .withMessage("Selection of truck is not from the provided list")
      .trim()
      .escape(),

        //Number of trucks validation
    body("numberOfTruck")
    .notEmpty().withMessage("Please enter number of trucks.")
    .isInt().withMessage("Number of trucks must be an integer") // Data type
    .custom((value) => {
      if (value > 100) {
        throw new Error("Number of trucks cannot exceed 100");
      }
      return true;
    })

    //Sanitizers
    .trim()
    .escape() 
    ,

    //Cargo value validation
    body("CargoValue")
    .notEmpty().withMessage("Please enter cargo value.")
    .custom((value) => {
      const regex = /^\d+(\.\d+)?$/;
      if (!regex.test(value)) {
        throw new Error("cargo value must be a valid number");
      }
      return true;
    })
    
    //Sanitizers
    .trim()
    .escape(),

    body("weight").toFloat().isFloat({ min: 0.5 }).withMessage("Weight must be at least 0.5 tons"),
    //Image validation
    body("image")
    .notEmpty().withMessage("Please upload cargo image")
    .custom(async (value, { req }) => {
      const fileExtension = value.substring(value.lastIndexOf('.') + 1);
      const allowedExtensions = ['png', 'jpg', 'jpeg'];

      if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
        throw new Error("Invalid image format. Please upload a PNG, JPG, or JPEG file.");
      }
      return true;
    })
    ,

    //Notes validation
    body("notes")
    .isLength({  max:1000 }).withMessage("Notes maximum length: 1000") //length
    .isString().withMessage("Notes must be a string")//datatype
 
    //Sanitizers
    .trim()
    .escape()  
  
  ];
}

function addOrder(pickup, dropOff, datePickUp, dateDropOff, typeCargo, truck, numberOfTruck, CargoValue,weight, image, notes) {
  // اتصال بقاعدة البيانات
  const mysql = require("mysql2");
  let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "naqel_limited_company",
  });

  db.connect(function (err) {
    // البيانات المطلوب إدخالها في قاعدة البيانات
    let sql = `INSERT INTO \`order\` (pickup, dropOff, datePickUp, dateDropOff, typeCargo, truck, numberOfTruck, CargoValue, weight, image, notes) VALUES 
    ('${pickup}', '${dropOff}', '${datePickUp}', '${dateDropOff}', '${typeCargo}', '${truck}', '${numberOfTruck}', '${CargoValue}','${weight}', '${image}', '${notes}')`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record has been added");
      // إغلاق الاتصال بقاعدة البيانات
      db.end();
    });
  });
  
}

//////////////////////////////////////////Configure truck///////////////////////////////////////////////////
//Json routing
let formValidationTruck = getFormValidation();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.post("/configTruck", formValidationTruck, (request, response) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        configMsg = {status:false, err:"Sorry, we found validation erros with your submission"}
        return response.status(422).json({errors:errors.array()});
    }else {
        //no errors
        const Owner = request.body.Owner;
        const OwnerID = request.body.OwnerID;
        const formOwnerIDFile = request.body.formOwnerIDFile;
        const user = request.body.user;
        const userID = request.body.userID;
        const formUserIDFile = request.body.formUserIDFile;
    
        const LicensePlate = request.body.LicensePlate;
        const VehicleChassis = request.body.VehicleChassis;
        const RegistrationType = request.body.RegistrationType;
        const VehicleBrand = request.body.VehicleBrand;
        const VehicleModel = request.body.VehicleModel;
        const Colour = request.body.Colour;
        const ManufactureYear = request.body.ManufactureYear;
        const Serial_number = request.body.Serial_number;
    
        const insurance_start = request.body.insurance_start;
        const insurance_end = request.body.insurance_end;
        const inspection_start = request.body.inspection_start;
        const inspection_end = request.body.inspection_end;
    
        const formVehicleRegistrationFile = request.body.formVehicleRegistrationFile;
        const formVehiclePhotoFile = request.body.formVehiclePhotoFile;

        addTruck(Owner, OwnerID, formOwnerIDFile,  user, userID, formUserIDFile, 
            LicensePlate, VehicleChassis, RegistrationType, VehicleBrand, VehicleModel, Colour, ManufactureYear, Serial_number, 
            insurance_start, insurance_end, inspection_start, inspection_end,
            formVehicleRegistrationFile, formVehiclePhotoFile
        );

        console.log({configMsg:"form is validated"});
    }
});

function getFormValidation(){
    return [
        body("Owner")
        //validators
        .notEmpty().withMessage("Owner name is required.") // check if not empty
        .isLength({ min: 2, max:20 }).withMessage("Owner name must be between 2 and 20 chars.") //length
        .isString().withMessage("Owner name must be a string")//datatype
        .matches("[A-Za-z]+").withMessage("Owner name must consist of letters only")//format

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("OwnerID")
         //validators
         .notEmpty().withMessage("Owner ID is required.") // check if not empty
         .isLength({ exact: 10 }).withMessage("Owner ID must be 10 digits") //length
         .isInt().withMessage("Owner ID must be Integer")//datatype
         .matches("[0-9]+").withMessage("Owner ID must be numbers only")//format
 
         //Sanitizers
         .trim()
         .escape()
         ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("formOwnerIDFile")
        .notEmpty().withMessage("Owner ID file is required.") // check if not empty
        .custom(async (value, { req }) => {
            const fileExtension = value.substring(value.lastIndexOf('.') + 1);
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];
      
            if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
              throw new Error("Owner ID file must be either a photo (JPG, JPEG, PNG, GIF) or a PDF");
            }
            return true;
        })
        
        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("user")
        // Validators
        .if((value, { req }) => req.body.user !== undefined && req.body.user !== '') // Manual check for optional field
        .isLength({ min: 2, max: 20 }).withMessage("User name must be between 2 and 20 characters") // Length
        .isString().withMessage("User name must be a string") // Data type
        .matches(/[A-Za-z]+/).withMessage("User name must consist of letters only") // Format (letters only)

        // Sanitizers
        .trim()
        .escape()
        ,

        body("userID")
        // Validators
        .if((value, { req }) => req.body.userID !== undefined && req.body.userID !== '') // Manual check for optional field
        .isLength({ exact: 10 }).withMessage("User ID must be 10 digits") // Length
        .isInt().withMessage("User ID must be an integer") // Data type
        .matches(/[0-9]+/).withMessage("User ID must be numbers only") // Format (numbers only)

        // Sanitizers
        .trim()
        .escape(),
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("formUserIDFile")
        .custom(async (value, { req }) => {
            if (value) {
              const fileExtension = value.substring(value.lastIndexOf('.') + 1);
              const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];
        
              if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
                throw new Error("User ID file must be either a photo (JPG, JPEG, PNG, GIF) or a PDF");
              }
            }
            return true;
          })

        
        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("LicensePlate")
        //validators
        .notEmpty().withMessage("License plate is required.") // check if not empty
        .isLength({ exact: 8 }).withMessage("License plate must be 8 digits") //length
        .isString().withMessage("License plate must be a string")//datatype
        .matches(/^\d{4} [A-Za-z]{3}$/).withMessage("License plate format must be: 0000 abc")//format

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("VehicleChassis")
        //validators
        .notEmpty().withMessage("vehicle chassis is required.") // check if not empty
        .isLength({ exact: 17 }).withMessage("Vehicle chassis number must be 17 digits") //length
        .isString().withMessage("Vehicle chassis must be a string")//datatype
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/).withMessage("Vehicle chassis must contain both numbers and letters") // Format (both numbers and letters)
 
        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("RegistrationType")
        //validators
        .notEmpty().withMessage("Registration type is required.") // check if not empty
        .isLength({ min: 2, max:20 }).withMessage("Registration type must be between 2 and 20 chars.") //length
        .isString().withMessage("Registration type must be a string")//datatype
        .matches("[A-Za-z]+").withMessage("Registration type must consist of letters only")//format

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("VehicleBrand")
        //validators
        .notEmpty().withMessage("Vehicle brand is required.") // check if not empty
        .isLength({ min: 2, max:20 }).withMessage("Vehicle brand must be between 2 and 20 chars.") //length
        .isString().withMessage("Vehicle brand must be a string")//datatype
        .matches("[A-Za-z]+").withMessage("Vehicle brand must consist of letters only")//format

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("VehicleModel")
        //validators
        .notEmpty().withMessage("Vehicle model is required.") // check if not empty
        .isLength({ min: 2, max:20 }).withMessage("Vehicle model must be between 2 and 20 chars.") //length
        .isString().withMessage("Vehicle model must be a string")//datatype
        .matches("[A-Za-z]+").withMessage("Vehicle model must consist of letters only")//format

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("Colour")
        //validators
        .notEmpty().withMessage("Vehicle colour is required.") // check if not empty
        .isLength({ min: 2, max:20 }).withMessage("Colour must be between 2 and 20 chars.") //length
        .isString().withMessage("Colour must be a string")//datatype
        .matches("[A-Za-z]+").withMessage("Colour must consist of letters only")//format

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("ManufactureYear")
        //validators
        .notEmpty().withMessage("Manufacture year is required.") // check if not empty
        .isLength({ exact: 4 }).withMessage("Year must be 4 digits") //length
        .isInt().withMessage("Year must be a number")//datatype
        .matches("[0-9]").withMessage("Year must consist of numbers only")//format
        .custom((value) => {
            const currentYear = new Date().getFullYear();
            const enteredYear = parseInt(value, 10);
            if (enteredYear > currentYear) {
              throw new Error("Year cannot be a future year");
            }
            return true;
          })
 
        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("Serial_number")
        //validators
        .notEmpty().withMessage("Serial number is required.") // check if not empty
        .isLength({ min: 8, max:10 }).withMessage("Serial number must be between 8 and 10 digits") //length
        .isInt().withMessage("Serial number must be an Integer")//datatype

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("insurance_start")
        //validators
        .notEmpty().withMessage("insurance start date is required.") // check if not empty
        .isBefore().withMessage("Insurance start date can't start after current date")

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("insurance_end")
        //validators
        .notEmpty().withMessage("insurance end date is required.") // check if not empty
        .isAfter().withMessage("Insurance can't end before current date")

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("inspection_start")
        //validators
        .notEmpty().withMessage("Inspection start date is required.") // check if not empty
        .isBefore().withMessage("Inspection start date can't start after current date")

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("inspection_end")
        //validators
        .notEmpty().withMessage("inspection end date is required.") // check if not empty
        .isAfter().withMessage("Inspection can't end before current date")

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("formVehicleRegistrationFile")
        .notEmpty().withMessage("Vehicle registration file is required.") // check if not empty
        .custom(async (value, { req }) => {
            const fileExtension = value.substring(value.lastIndexOf('.') + 1);
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];
      
            if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
              throw new Error("Vehicle registration file must be either a photo (JPG, JPEG, PNG, GIF) or a PDF");
            }
            return true;
        })

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        body("formVehiclePhotoFile")
        .notEmpty().withMessage("Vehicle photo is required.") // check if not empty
        .custom(async (value, { req }) => {
            const fileExtension = value.substring(value.lastIndexOf('.') + 1);
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];
      
            if (!allowedExtensions.includes(fileExtension.toLowerCase())) {
              throw new Error("Vehicle photo file must be either a photo (JPG, JPEG, PNG, GIF) or a PDF");
            }
            return true;
        })

        //Sanitizers
        .trim()
        .escape()
    ]
}

function addTruck(Owner, OwnerID, formOwnerIDFile,  user, userID, formUserIDFile, 
    LicensePlate, VehicleChassis, RegistrationType, VehicleBrand, VehicleModel, Colour, ManufactureYear, Serial_number, 
    insurance_start, insurance_end, inspection_start, inspection_end,
    formVehicleRegistrationFile, formVehiclePhotoFile) {

    //connection
    const mysql = require("mysql2");
    let db = mysql.createConnection({
        host:"127.0.0.1", 
        user:"root",
        password:"root",
        port:"3306",
        database:"naqel_limited_company"
    });

    db.connect(function(err){

    //sql command
    let sql = `INSERT INTO truck (Owner, OwnerID, formOwnerIDFile,  user, userID, formUserIDFile, LicensePlate, VehicleChassis, RegistrationType, VehicleBrand, VehicleModel, Colour, ManufactureYear, Serial_number, insurance_start, insurance_end, inspection_start, inspection_end, formVehicleRegistrationFile, formVehiclePhotoFile) VALUES ('${Owner}', '${OwnerID}', '${formOwnerIDFile}', '${user}', '${userID}', '${formUserIDFile}', '${LicensePlate}', '${VehicleChassis}', '${RegistrationType}', '${VehicleBrand}', '${VehicleModel}', '${Colour}', '${ManufactureYear}', '${Serial_number}', '${insurance_start}', '${insurance_end}', '${inspection_start}', '${inspection_end}', '${formVehicleRegistrationFile}', '${formVehiclePhotoFile}')`;
    db.query(sql, function(err, result){

    if(err) throw err;
    console.log("1 record has been added");
        //close connection
        db.end();
        })
    })
}


/////////////////Server////////////////////////
const port = 8011;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});

