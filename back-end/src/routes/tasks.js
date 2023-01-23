const express = require('express');
const tasks = require('../controller/tasks');

const router = express.Router();

router.get('/', tasks.getMultiple);
router.post('/', tasks.create);
router.patch('/:id', tasks.update);
router.get('/:id', tasks.getSingle);

module.exports = router;
