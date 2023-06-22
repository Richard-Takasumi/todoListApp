const { Router } = require('express');
const { getToDo } = require('../controllers/ToDoController');
const { saveToDo } = require('../controllers/ToDoController');

const router = Router();

router.get('/', getToDo);
router.post('/save', saveToDo);

module.exports = router;