/**
 * @author Ivonne Y. Mendoza <imendoza@imendoza.io>
 * session controller site
 */

const express = require("express");
const router = express.Router();

//display index page
router.get("/", (req, res, next) => {
    res.render("index");
  });

//session control
router.use((req, res, next) => {
    if (req.session.user) { 
      next(); 
    } 
    else {                  
      res.redirect("/auth/login");       
    }                                
});                              


module.exports = router;