const express = require("express");
const router = express.Router();

const { searchData } = require("../controllers/searchController");

// GET /search
router.get("/", searchData);

module.exports = router;