const router = require('express').Router()
const postController = require('../controllers/postController')

// post CRUD
router.post('/', postController.createPost)
router.get('/', postController.getPost)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)

// post likes
router.patch('/like/:id', postController.likePost)
router.patch('/unlike/:id', postController.unLikePost)

// post comments
router.patch('/comment/:id', postController.commentPost)
router.patch('/modify-comment/:id', postController.modifyCommentPost)
router.patch('/delete-comment/:id', postController.deleteCommentPost)

module.exports = router