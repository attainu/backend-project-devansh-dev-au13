import express from 'express';
var router   = express.Router()
import { check, validationResult } from 'express-validator';
import authController from '../controller/authcontroller';
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
authController.signup);
router.post('/login', authController.login)
   



module.exports = router;
   