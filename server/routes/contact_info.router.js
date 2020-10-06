const express = require("express");
const contact_router = express.Router();
const ctrl =  require("../controllers/contactInfo.controller");

contact_router.route("/list").get(ctrl.list);
contact_router.route("/create").post(ctrl.create);
contact_router.route("/update").put(ctrl.update);
contact_router.route("/delete").delete(ctrl.delete);

console.log("routes ------------------");

module.exports = contact_router;
