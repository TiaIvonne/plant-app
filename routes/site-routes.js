const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("index");
  });

router.use((req, res, next) => {
  
    if (req.session.user) { 
      next(); 
    } else {                  
      res.redirect("/auth/login");       
    }                                
  });                              


module.exports = router;