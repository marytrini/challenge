const {Router} = require('express');
const activeNotesRouter = require('./activeNotesRouter');
const archivedNotesRouter = require('./archivedNotesRouter');
const notesRouter = require('./notesRouter');

const router = Router();

router.use('/notes',notesRouter);
router.use('/archived', archivedNotesRouter);
router.use('/active', activeNotesRouter)

module.exports = router;