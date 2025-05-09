const express = require('express');
const router = express.Router();
const {  } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

router.get('/',getPosts);
router.post('/',protect,createPost);
router.get('/name/:name', getUserPostsByName);

module.exports = router;