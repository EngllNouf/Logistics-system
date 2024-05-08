const express = require("express");
const mysql = require("mysql2");
const { body, validationResult } = require("express-validator");
const path = require("path");

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

// Serve static files from the TraderRegistration folder
app.use("/TraderRegistration", express.static(path.join(__dirname, "TraderRegistration")));

// Serve static files
app.use("/", express.static("./website-logistics-system"));
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

    // تحقق مما إذا كان المستخدم موجودًا في قاعدة البيانات
    const sql = "SELECT * FROM users WHERE username = ?";
    connection.query(sql, [UserName], (err, result) => {
      if (err) {
        console.error("Error executing the database query: " + err.stack);
        return res.status(500).json({
          status: false,
          error: "An error occurred while executing the database query.",
        });
      }

      if (result.length === 0) {
        // المستخدم غير موجود في قاعدة البيانات
        return res.status(401).json({
          status: false,
          error: "Invalid username or password.",
        });
      }

      // المستخدم موجود في قاعدة البيانات، قم بتوجيهه إلى صفحة التسجيل
      return res.redirect("/TraderRegistration/HTML/Registration.html");
    });
  }
);
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

    // تحقق مما إذا كان المستخدم موجودًا في قاعدة البيانات
    const sql = "SELECT * FROM users WHERE username = ?";
    connection.query(sql, [UserName], (err, result) => {
      if (err) {
        console.error("Error executing the database query: " + err.stack);
        return res.status(500).json({
          status: false,
          error: "An error occurred while executing the database query.",
        });
      }

      if (result.length === 0) {
        // المستخدم غير موجود في قاعدة البيانات
        return res.status(401).json({
          status: false,
          error: "Invalid username or password.",
        });
      }

      // المستخدم موجود في قاعدة البيانات، قم بتوجيهه إلى صفحة التسجيل
      return res.redirect("/TraderRegistration/HTML/Registration.html");
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

const port = 2;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
