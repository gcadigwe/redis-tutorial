const express = require("express");
const session = require("express-session");

const app = express();
const port = 3000;

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/login", (req, res) => {
  // Authentication logic here
  req.session.userId = "exampleUserId"; // Store user ID in session
  res.send("Logged in");
});

app.get("/dashboard", (req, res) => {
  if (req.session.userId) {
    res.send(`Welcome, user ${req.session.userId}`);
  } else {
    res.status(401).send("Unauthorized");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
