const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

// const usersPath = path.join(__dirname, "../users.json");
// const users = JSON.parse(fs.readFileSync(usersPath, "utf-8"));

exports.authenticateUser = async ({ username, password }, users) => {
  const user = users.find((user) => user.username === username);
  if (!user) {
    return { success: false, message: "User not found" };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, message: "Invalid password" };
  }
  return { success: true, message: "Authentication successful", user };
};

exports.checkIsAdmin = (role) => {
  return role == "admin" ? true : false;
};
