const userService = require("../services/user.service");

exports.checkLogin = async (req, res, users, callback) => {
  const result = await userService.authenticateUser({ ...req }, users);
  callback(result);
};
