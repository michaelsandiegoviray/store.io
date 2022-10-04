const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const itemsController = require("../controllers/items");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, itemsController.getItem);

router.post("/createItem", itemsController.createItem);

router.put("/likePost/:id", itemsController.likeItem);

router.delete("/deletePost/:id", itemsController.deleteItem);

module.exports = router;
