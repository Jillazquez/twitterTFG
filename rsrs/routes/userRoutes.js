const express = require('express');
const multer = require('multer');
const { 
    createUser, getUsers, loginUser, followUser, unfollowUser, 
    isFollowing, getNumberFollowers, randomUsers, changeDescription, 
    userInfo, updateProfilePicture , changeUsername
} = require('../controllers/userController');
const cloudinary = require('../config/cloudinaryConfig'); 
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profile_pictures', 
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});
const upload = multer({ storage });

router.get('/', getUsers);
router.post('/login', loginUser);
router.post('/register', createUser);
router.post('/follow', followUser);
router.delete('/follow', unfollowUser);
router.post('/isFollowing', isFollowing);
router.post('/getFollowers', getNumberFollowers);
router.get('/getRandomUsers', randomUsers);
router.post('/changeDescription', changeDescription);
router.get('/userInfo', userInfo);
router.post('/changeUsername',changeUsername)

router.post('/updateProfilePicture', upload.single('profilePicture'), updateProfilePicture);

module.exports = router;
