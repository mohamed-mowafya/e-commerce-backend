const express = require('express'); 


const router  = express.Router(); 

const userAuthController = require('../controllers/userAuth')
const profileController = require("../controllers/profileController")

router.post('/login', userAuthController.login);
router.patch('/update-user', profileController.updateProfile);
router.post('/register', userAuthController.signUp);
router.post("/logout", userAuthController.logOut);
router.get('/isauth', userAuthController.checkAuth);

module.exports = router;