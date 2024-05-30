const express = require('express');
const getActiveNotes = require('../controllers/activeController');

const router = express.Router();

router.get('/', getActiveNotes);


module.exports = router;