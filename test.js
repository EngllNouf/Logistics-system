const express = require("express");
const mysql = require("mysql");
const { body, validationResult } = require("express-validator");
const app = express();

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "loginandsignup",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use("/", express.static("./website-logistics-system"));

// Login route
app.post(
  "/login",
  body("UserName").notEmpty().withMessage("Username is required"),
  body("Password").notEmpty().withMessage("Password is required"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { UserName, Password } = req.body;

    // Check username and password in the database
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    connection.query(sql, [UserName, Password], (err, result) => {
      if (err) {
        console.error("Error executing the database query: " + err.stack);
        return res.status(500).json({
          status: false,
          error: "An error occurred while executing the database query.",
        });
      }

      if (result.length === 0) {
        // No user found with the provided credentials
        return res.status(401).json({
          status: false,
          error: "Invalid username or password.",
        });
      }

      // User authenticated successfully
      // You can perform further actions here, such as setting up a session or returning a token

      // Check if the user has access to the home page
      const user = result[0];
      if (user.access_home_page !== 1) {
        return res.status(403).json({
          status: false,
          error: "You don't have access to the home page.",
        });
      }

      // Send the redirect URL in the response
      return res.json({ redirectUrl: "/index.html" });
    });
  }
);

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

    // Insert the user data into the database
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
      return res.redirect("/index.html");
    });
  }
);

const port = 4111;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
















//////////////////////////////////////////PLACE ORDER///////////////////////////////////////////////////
//JSON routing
let formValidation = getFormValidation(); // ميثود يشيك اذا فيه اخطاء او لا والنتيجة ترجع فيه
app.use(express.urlencoded({extended:false}));
app.use(express.json());// نفعل وضعية json
app.post("/process",formValidation, (request, response) => {// formValidation يسمح لنا نستخدم الميثود
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
        const goodsValue = request.body.goodsValue;
        const image = request.body.image;
        const notes = request.body.notes;
        addOrder(pickup, dropOff, datePickUp,dateDropOff,typeCargo,truck,
          numberOfTruck,goodsValue,image,notes);
          response.status(200).json({msg: "Form is validated", redirectUrl: "/Trader/Trader.html"});
   }
 });


function getFormValidation() {//فانكشن يرجع اوبجيكت 
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
  ];
}

function addOrder(pickup, dropOff, datePickUp, dateDropOff, typeCargo, truck, numberOfTruck, goodsValue, image, notes) {
  // اتصال بقاعدة البيانات
  const mysql = require("mysql2");
  let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "placeorder",
  });

  db.connect(function (err) {
    // البيانات المطلوب إدخالها في قاعدة البيانات
    let sql = `INSERT INTO \`order\` (pickup, dropOff, datePickUp, dateDropOff, typeCargo, truck, numberOfTruck, goodsValue, image, notes) VALUES 
    ('${pickup}', '${dropOff}', '${datePickUp}', '${dateDropOff}', '${typeCargo}', '${truck}', '${numberOfTruck}', '${goodsValue}', '${image}', '${notes}')`;
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
const {check, validationResult} = require ("express-validator");
let formValidation = getFormValidation();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.post("/process", formValidation, (request, response) => {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        msg = {status:false, err:"Sorry, we found validation erros with your submission"}
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

        response.status(200).json({msg:"form is validated"});
    }
});

function getFormValidation(){
    return [
        check("Owner")
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

        check("OwnerID")
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

        check("formOwnerIDFile")
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

        check("user")
        // Validators
        .if((value, { req }) => req.body.user !== undefined && req.body.user !== '') // Manual check for optional field
        .isLength({ min: 2, max: 20 }).withMessage("User name must be between 2 and 20 characters") // Length
        .isString().withMessage("User name must be a string") // Data type
        .matches(/[A-Za-z]+/).withMessage("User name must consist of letters only") // Format (letters only)

        // Sanitizers
        .trim()
        .escape()
        ,

        check("userID")
        // Validators
        .if((value, { req }) => req.body.userID !== undefined && req.body.userID !== '') // Manual check for optional field
        .isLength({ exact: 10 }).withMessage("User ID must be 10 digits") // Length
        .isInt().withMessage("User ID must be an integer") // Data type
        .matches(/[0-9]+/).withMessage("User ID must be numbers only") // Format (numbers only)

        // Sanitizers
        .trim()
        .escape(),
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        check("formUserIDFile")
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

        check("LicensePlate")
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

        check("VehicleChassis")
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

        check("RegistrationType")
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

        check("VehicleBrand")
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

        check("VehicleModel")
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

        check("Colour")
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

        check("ManufactureYear")
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

        check("Serial_number")
        //validators
        .notEmpty().withMessage("Serial number is required.") // check if not empty
        .isLength({ min: 8, max:10 }).withMessage("Serial number must be between 8 and 10 digits") //length
        .isInt().withMessage("Serial number must be an Integer")//datatype

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        check("insurance_start")
        //validators
        .notEmpty().withMessage("insurance start date is required.") // check if not empty
        .isBefore().withMessage("Insurance start date can't start after current date")

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        check("insurance_end")
        //validators
        .notEmpty().withMessage("insurance end date is required.") // check if not empty
        .isAfter().withMessage("Insurance can't end before current date")

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        check("inspection_start")
        //validators
        .notEmpty().withMessage("Inspection start date is required.") // check if not empty
        .isBefore().withMessage("Inspection start date can't start after current date")

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        check("inspection_end")
        //validators
        .notEmpty().withMessage("inspection end date is required.") // check if not empty
        .isAfter().withMessage("Inspection can't end before current date")

        //Sanitizers
        .trim()
        .escape()
        ,
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////

        check("formVehicleRegistrationFile")
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

        check("formVehiclePhotoFile")
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
        database:"truckdatabase"
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


 /*Database:
CREATE TABLE truck (
    truckID INT AUTO_INCREMENT PRIMARY KEY,
    Owner VARCHAR(255) NOT NULL,
    OwnerID INT NOT NULL,
    formOwnerIDFile VARCHAR(255) NOT NULL,
    user VARCHAR(255) DEFAULT NULL,
    userID INT DEFAULT 0,
    formUserIDFile VARCHAR(255) DEFAULT NULL,
    LicensePlate VARCHAR(255) NOT NULL,
    VehicleChassis VARCHAR(255) NOT NULL,
    RegistrationType VARCHAR(255) NOT NULL,
    VehicleBrand VARCHAR(255) NOT NULL,
    VehicleModel VARCHAR(255) NOT NULL,
    Colour VARCHAR(255) NOT NULL,
    ManufactureYear INT NOT NULL,
    Serial_number VARCHAR(255) NOT NULL,
    insurance_start DATE NOT NULL,
    insurance_end DATE NOT NULL,
    inspection_start DATE NOT NULL,
    inspection_end DATE NOT NULL,
    formVehicleRegistrationFile VARCHAR(255) NOT NULL,
    formVehiclePhotoFile VARCHAR(255) NOT NULL
);*/
