const express = require("express");
const { Router } = require("express");
const home = Router();

home.get("/", (req, res) => {  
    res.render('home'); 
});

module.exports = home;