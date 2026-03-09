const express = require('express');
const router = express.Router();


const users = [];

router.get("/", (req, res) => {
    res.render("all-users", {
        pageTitle: "Home",
        url: req.url,
        registerUser: users
    })
})

router.get("/users", (req, res) => {
    res.render("add-users", {
        pageTitle: "Add-User",
        url: req.url
    })
})
router.post("/add-users", (req, res) => {
    users.push({
        name: req.body.username
    })
    res.redirect('/');
})

module.exports = router;