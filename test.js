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