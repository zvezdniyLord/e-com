const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

// адрес для получения рейтинга от пользователя
router.post('/:id/rating', deviceController.setRating);

module.exports = router
