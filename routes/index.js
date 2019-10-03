var express = require('express');
var router = express.Router();
const { postsIndex, postShow, postNew, createPost, postEdit, postDelete, postSave } = require(__dirname + '/../controllers/posts');

/* GET home page. */
router.get('/', postsIndex);

router.get('/post/new', postNew);
router.post('/post/new', createPost);
router.get('/post/:id', postShow);
router.get('/post/:id/edit', postEdit);
router.get('/post/:id/delete', postDelete);
router.post('/post/:id/save', postSave);

module.exports = router;
