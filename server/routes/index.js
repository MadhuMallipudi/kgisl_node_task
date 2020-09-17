const express = require("express");
const router =  express.Router();
const contactController =  require("../controllers/contactInfo.controller");
// const loginController = require("");
// router.route("/login").get(loginController.login);
router.route("/list").get(contactController.list);
router.route("/create").post(contactController.create);
router.route("/update").put(contactController.update);
router.route("/delete").delete(contactController.delete);


module.exports = router;