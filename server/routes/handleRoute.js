const express = require("express")
const {getPreference, getPodcast, updatePreference} = require("../controllers/handleController");

const router = express.Router();

router.get("/preference/user/:id", getPreference);
router.get("/podcast/user/:id", getPodcast);
router.post("/preference/update", updatePreference);

module.exports = router;