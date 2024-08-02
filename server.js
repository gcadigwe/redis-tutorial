const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    host: "** your host**", // Redis server host
    port: "**your port**", // Redis server port
  },
  password: "**your db password**",
});

redisClient.connect().catch(console.error);

const app = express();
const port = 3000;

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.get("/login", (req, res) => {
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
