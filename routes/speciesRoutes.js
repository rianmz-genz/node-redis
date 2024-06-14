const express = require("express");
const speciesController = require("../controllers/speciesController");

const router = express.Router();

router.get("/:species", speciesController.getSpeciesData);

module.exports = router;
