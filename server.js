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



const port = 8800;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});


