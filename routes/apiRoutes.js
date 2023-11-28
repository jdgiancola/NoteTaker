const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// Helper functions
const readNotes = () => JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json'), 'utf8'));
const writeNotes = (notes) => fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(notes));

// GET Route for retrieving notes
router.get('/notes', (req, res) => {
  res.json(readNotes());
});

// POST Route for a new note
router.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = { ...req.body, id: Date.now().toString() };
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

module.exports = router;
