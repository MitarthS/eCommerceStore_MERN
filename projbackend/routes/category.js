const express = require("express");
const router = express.Router();
const {
    getCategoryById,
    createCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    removeCategory,
} = require("../controllers/category");
const { isSignedin, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserbyId } = require("../controllers/user");

router.param("userId", getUserbyId);
router.param("categoryId", getCategoryById);

//routes
router.post(
    "/category/create/:userId",
    isSignedin,
    isAuthenticated,
    isAdmin,
    createCategory
);
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

//updating
router.put(
    "/category/:categoryId/:userId",
    isSignedin,
    isAuthenticated,
    isAdmin,
    updateCategory
);
//deleting
router.delete(
    "/category/:categoryId/:userId",
    isSignedin,
    isAuthenticated,
    isAdmin,
    removeCategory
);

module.exports = router;
