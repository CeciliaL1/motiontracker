const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();
const { randomUUID } = require("crypto");

router.use(cors());

module.exports = router;
