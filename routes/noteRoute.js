const express = require('express');
const router = express.Router();
const { createNote, getNote, getAllNotes, updateNote } = require('../controllers/noteController');

router.route('/').get(getAllNotes).post(createNote);
router.route('/:id').get(getNote).put(updateNote);
module.exports = router;