const express = require('express')
const router = express.Router();
const userController = require('../controllers/userContoller')
const imageController = require('../controllers/imageController')
const { uploadSingleAvatar } = require('../utils/multer')
const passport = require('passport')


router.get('/', (req,res) => {
    if(req.isAuthenticated()) {
        return res.redirect('/api/profile')
    }
    return res.render('profile',{
        title: "Home Page",
    })
})

router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/register', userController.register);
router.get('/signIn', userController.signIn);
router.get('/logout', userController.logout);

router.post('/createUser', uploadSingleAvatar, userController.createUser);

router.post('/loginUser', passport.authenticate(
    'local',
    { failureRedirect: '/api/signIn' }
),  userController.loginUser );

//filter images
router.post('/filterImage', imageController.filterImage);


// for images
router.get('/upload_image', imageController.upload_image);
router.post('/imageUploadRoute',  uploadSingleAvatar, imageController.imageUploadRoute);

//find all user
router.get('/findAllUsers', userController.findAllUsers);
router.get('/findAllImages', imageController.findAllImages);
router.get('/deleteAllImages', imageController.deleteAllImages);
router.get('/getCombineData/:id', imageController.getCombineData);

module.exports = router;