const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Home Page"));

app.listen(port, () => console.log(`Example app listening on port ${port}`));

const isLoggedin = (req, res, next) => {
    console.log(`Inside isLoggedin middleware`);
    next();
};

const isAdmin = (req, res, next) => {
    console.log(`Inide isAdmin middleware`);
    next();
};

app.get("/login", (req, res) => res.send("Login route"));
app.get("/admin", isLoggedin, isAdmin, (req, res) => res.send("Admin route"));
app.get("/signUp", (req, res) => res.send("Sign Up route"));
app.get(" /signOut", (req, res) => res.send("Sign Out route"));
app.get("/Mitarth", (req, res) => res.send("OMG! KAMI SAMA"));
