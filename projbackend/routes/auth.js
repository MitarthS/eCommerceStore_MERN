var express = require("express");
const { check } = require("express-validator");
var router = express.Router();
const { signout, signup, signin, isSignedin } = require("../controllers/auth");
router.post(
    "/signup",
    [
        check("name", "Name should be atleast 3 chars long").isLength({
            min: 3,
        }),
        check("email", "Email is reqd").isEmail(),
        check("password", "Password should be 3 min chars").isLength({
            min: 3,
        }),
    ],
    signup
);

router.post(
    "/signin",
    [
        check("email", "Email is reqd").isEmail(),
        check("password", "Password is required").isLength({
            min: 1,
        }),
    ],
    signin
);
router.get("/signout", signout);

router.get("/testroute", isSignedin, (req, res) => {
    res.json(req.auth);
});
module.exports = router;
