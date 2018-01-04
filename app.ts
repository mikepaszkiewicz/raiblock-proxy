const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();

const urls = [
  "https://www.raiblocks.club/callback",
  "https://www.raidots.live/callback"
];

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .send("Proxy is running")
    .end();
});

app.post("/", (req, res) => {
  const blockData = req.data;
  //send looks like this, not sure if RPC returns stringified block or json?
  //   {
  //     "account": "xrb_1m5cfk468k9cwfdp8zsiktc3dghxh6qabef7mno5odos9h91nn5wzs58g7st",
  //     "hash": "B5678177F615A890C28F6716FBD81E1068ADAC27C85E00EDCCC21832CFF1C413",
  //     "block": {
  //         "type": "send",
  //         "previous": "F91264792342F6B99CC9B3C946726537EFA5F7C925CCCAB49C32B5B423CCB07B",
  //         "destination": "xrb_39ymww61tksoddjh1e43mprw5r8uu1318it9z3agm7e6f96kg4ndqg9tuds4",
  //         "balance": "000000015D47BE1FF551BFBBE1000000",
  //         "work": "f57ec8eab4e3d760",
  //         "signature": "DBD8ECA13CCDEC87FAE0E7B2AAA2460492249410A18E9C06AD454862260038D8B55ACD130F9C402C24ED3E97C579E33C82B93368156B8E0E4183CF7B45205B0A"
  //     },
  //     "amount": "1099000000000000000000000000000000"
  // }
  console.log("body is ", req.body);
  urls.forEach(url => {
    console.log("forwarding block to ", url);
    axios
      .post(url, blockData)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.warn(err.message);
      });
  });

  res
    .status(200)
    .send("Forwarded")
    .end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
