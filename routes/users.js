const express         = require('express');
const router          = express.Router();
const multer          = require("multer")
const uploadUserFile  = require('../middlewares/uploadUserImage');
const usersController = require('../controllers/usersController')
const validations     = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware  = require('../middlewares/authMiddleware');
const {	validationResult } = require('express-validator');

/*** GET ALL USERS ***/
router.get("/", usersController.list)

/*** LOGIN ***/ 
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);
router.get('/logout/', usersController.logout)

/*** CREATE ONE USER ***/ 
router.get ("/register", usersController.register)
router.post ('/register', uploadUserFile.single('imageInput'), validations, usersController.store);

/*** DETAIL MY PROFILE ***/ 
router.get("/profile", authMiddleware, usersController.profile)

/*** DETAIL USER PROFILE ***/ 
router.get("/profile/:id", usersController.detail)

/*** EDIT MY PROFILE ***/
router.get('/:id/edit', usersController.editUser)
router.patch('/:id/edit', uploadUserFile.single('imageInput'), usersController.update);

// /*** DELETE ACCOUNT***/ 
router.delete('/:id', usersController.destroy)

module.exports = router;