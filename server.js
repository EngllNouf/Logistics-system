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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the TraderRegistration folder
app.use("/TraderRegistration", express.static(path.join(__dirname, "TraderRegistration")));

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

      // User has access to the home page
      // Perform further actions or proceed with the redirect
      return res.redirect("/index.html");
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
      return res.redirect("/Login&Sign/Login&.html");
    });
  }
);







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








const port = 2011;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});


