const express = require('express');
const {getNotes,getById, createNote, updateNote, deleteNote} = require('../controllers/notesController')

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', getById)
router.post('/create', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;