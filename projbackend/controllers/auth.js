const User = require("../models/user");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ error: errors.array()[0].msg });
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) res.status(400).json({ err: "Unable to save user in DB" });
        else
            res.json({
                name: user.name,
                id: user._id,
            });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ error: errors.array()[0].msg });
    User.findOne({ email }, (err, user) => {
        if (err || !user)
            return res.status(400).json({ err: "User does not exist" });
        if (!user.authenticate(password))
            return res.status(401).json({ err: "Incorrect Password" });
        //token creation here
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        //inserting sign in data into cookie
        res.cookie("token", token, { expire: new Date() + 9999 });
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "User Signout Successfully",
    });
};

//protected routes
exports.isSignedin = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
});

//Custom middleware
exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) return res.status(403).json({ error: "Access denied" });

    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0)
        return res.status(403).json({ error: "Not an Admin" });

    next();
};
