const express = require("express");
const { createNotes, getNotes, getNotesDetails } = require("./controller");
const verifyToken = require("../utils/helper.js/authHelper");
const router = express.Router();

router.post("/create", verifyToken, createNotes);

router.get("/:noteId", verifyToken, getNotesDetails);

router.get("/", verifyToken, getNotes);

module.exports = router;
