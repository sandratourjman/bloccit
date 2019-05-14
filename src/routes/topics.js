const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topicsController")

router.get("/topics", topicController.index);

module.exports = router;