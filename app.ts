const express = require("express");
import axios from "restyped-axios";
const app = express();

const urls = ["https://raiblocks.club"];
app.get("/", (req, res) => {
  const blockData = req.body;

  for (const url in urls) {
    axios.post(url, blockData);
  }

  res
    .status(200)
    .send("Forwarded")
    .end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
