const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController');

router.post('/', basketController.addItem);
router.get('/:userId', basketController.getAllItems)
router.delete('/', basketController.removeItems)
router.put('/', basketController.removeOneItem);

module.exports = router
