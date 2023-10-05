const express = require('express')
const {
    create,
    getAll,
    getOne,
    deleteId,
    update
} = require('../controlers/workoutControlers')

const router = express.Router()

router.get('/', getAll)

router.get('/read/:id', getOne)

router.post('/',create )

router.patch('/:id', update)

router.delete('/:id', deleteId)

module.exports = router