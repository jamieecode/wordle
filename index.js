require("dotenv").config();
const PORT = process.env.PORT;
const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/word", (req, res) => {
  const options = {
    method: "GET",
    url: "https://random-words5.p.rapidapi.com/getRandom",
    params: { wordLength: "5" },
    headers: {
      "x-rapidapi-host": "random-words5.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data);
    })
    .catch((err) => console.error(err));
});

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
