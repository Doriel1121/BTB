const bcrypt = require("bcrypt");

exports.authenticateUser = async ({ username, password }, users) => {
  const user = users.find((user) => user.username === username);
  if (!user) {
    return { success: false, message: "User not found" };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, message: "Invalid password" };
  }
  const { password: userPassword, ...userDto } = user;
  return {
    success: true,
    message: "Authentication successful",
    user: userDto,
  };
};

exports.checkIsAdmin = (role) => {
  return role == "admin" ? true : false;
};
