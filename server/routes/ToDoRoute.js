const { Router } = require('express');
const { getToDo, deleteToDo, updateToDo } = require('../controllers/ToDoController');
const { saveToDo } = require('../controllers/ToDoController');
const { saveCategory } = require('../controllers/ToDoController');

const router = Router();

router.get('/', getToDo);
router.post('/save-todo', saveToDo);
router.post('/save-category', saveCategory)
router.post('/delete-todo', deleteToDo)
router.post('/update-todo', updateToDo)
module.exports = router;