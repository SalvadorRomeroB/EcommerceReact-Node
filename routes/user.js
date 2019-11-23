const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("response from node.");
});

module.exports = router;
