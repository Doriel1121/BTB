const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const session = require("express-session");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const UserLogin = require("./controllers/userLogin.controller");
const RickData = require("./controllers/data.controller");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const usersPath = path.join(__dirname, "users.json");
const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

const app = express();

app.listen(3000, () => {
  console.log("listening to port 3000");
});
app.use(bodyParser.json()).use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    //   credentials: true,
  })
);

users.forEach((user) => {
  user.password = bcrypt.hashSync(user.password, 10);
});

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.substring("Bearer ".length);

      jwt.verify(token, "my_super_duper_secret_key", (err, decoded) => {
        if (err) {
          return res
            .status(401)
            .send({ success: false, message: "Unauthorized" });
        }
        next();
      });
    } else {
      res.status(401).send({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
app
  .post("/login", (req, res) => {
    const userInfo = req.body;
    UserLogin.checkLogin(userInfo, res, users, (result) => {
      if (result.success) {
        const token = jwt.sign(
          { username: result.user.username },
          "my_super_duper_secret_key",
          //supposed to be saved in .env
          { expiresIn: "1h" }
        );
        res.cookie("jwtToken", token, { httpOnly: true });
        res.send({ ...result, token });
      } else {
        res.send(result);
      }
    });
  })

  .get("/getData/:type", authenticateJWT, (req, res) => {
    console.log("params", req.params);
    RickData.getRelevantData(req.params, res, (result) => {
      res.send(result);
    });
  })
  .get("/search/:name", async (req, res) => {
    RickData.getCharactersByName(req, res, (response) => {
      res.json(response);
    });
  });
