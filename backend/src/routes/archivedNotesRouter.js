const express = require('express');
const getArchivedNotes = require('../controllers/archivedController');

const router = express.Router();

router.get('/', getArchivedNotes);

module.exports = router;