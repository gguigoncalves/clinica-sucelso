const { Router } = require('express')
const controller = require('../controller/patientController')

const router = Router()

router.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/', controller.store)
router.put('/:id', controller.update)
router.delete('/:id', controller.destroy)

module.exports = router