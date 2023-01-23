const express = require('express');
const statuses = require('../controller/statuses');
const router = express.Router();

router.get('/', statuses.getMultiple);
router.post('/', statuses.create);
router.patch('/:id', statuses.update);
router.put('/', statuses.updateManyStatuses);

module.exports = router;
