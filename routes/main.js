const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const itemsController = require('../controllers/items')
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, itemsController.getProfile);
router.get("/feed", ensureAuth, itemsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get('/services', itemsController.getServices)
router.get('/benefits', itemsController.getBenefits)
router.get('/news', itemsController.getNews)
module.exports = router;
