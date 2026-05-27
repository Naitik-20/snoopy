const express = require("express");
const router = express.Router();

const {
  addWholesaler,
  getWholesalers,
} = require("../controllers/wholesalerController");

router.post("/add", addWholesaler);
router.get("/", getWholesalers);

module.exports = router;