const router = require('express').Router()
const authController = require()

// authentification
router.post('/register', authController.signUp)
router.post('/login', authController.signIn)
router.get('/logout', authController.logout)

// user CRUD
router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

// user follows
router.patch('/follow/:id', userController.follow)
router.patch('/unfollow/:id', userController.unfollow)

module.exports = router