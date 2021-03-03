var express  = require('express')
var router   = express.Router()
const { check, validationResult } = require('express-validator');
const userController = require('../controller/authcontroller');
router.post('/signup',
[
    check("name", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").matches(/.+\@.+\..+/)
      .withMessage("Email must contain @"),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
],
   userController.signup);



module.exports = router;
   