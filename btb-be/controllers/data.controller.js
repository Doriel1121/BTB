const axios = require("axios");
exports.getRelevantData = async (req, res, callback) => {
  console.log(req);
  const url = "https://rickandmortyapi.com/api/" + req.type;
  const result = {};
  axios
    .get(url)
    .then((response) => {
      console.log("Data:", response.data);
      result.success = true;
      result.data = response.data;
      callback(result);
    })
    .catch((error) => {
      console.error("Error:", error);
      result.success = false;
      result.data = null;
      callback(result);
    });
};

exports.getCharactersByName = async (req, res, callback) => {
  const { name } = req.params;
  const result = {};
  if (!name) {
    return res.status(400).json({ error: "Name query parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${name}`
    );

    result.message = "";
    result.success = true;
    result.data = response.data;
    callback(result);
  } catch (error) {
    result.message = "Error fetching data from external API";
    result.success = false;
    result.data = null;
    res.status(500).json(result);
  }
};
