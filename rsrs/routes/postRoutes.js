const express = require('express');
const router = express.Router();
const { getPosts,createPost,getUserPostsByName,toggleLike } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
const checkRhymes = require('../middleware/checkRhymesMiddleware');

router.get('/',getPosts);
router.post('/',protect,checkRhymes,createPost);
router.get('/name/:name', getUserPostsByName);
router.post('/like', toggleLike);

module.exports = router;