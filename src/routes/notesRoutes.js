const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
  const { title, datetime, note } = req.body;
  try {
    const [result] = await db.query('INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)', [title, datetime, note]);
    res.status(201).json({ id: result.insertId, title, datetime, note });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const [notes] = await db.query('SELECT * FROM notes');
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [notes] = await db.query('SELECT * FROM notes WHERE id = ?', [id]);
    if (notes.length > 0) {
      res.status(200).json(notes[0]);
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, datetime, note } = req.body;
  try {
    const [result] = await db.query('UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?', [title, datetime, note, id]);
    if (result.affectedRows > 0) {
      res.status(200).json({ id, title, datetime, note });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM notes WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
