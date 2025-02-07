const express = require('express');
const app = express();
const db = require('./db'); // Assuming a database module

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  // Input validation
  if (isNaN(parseInt(userId))) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Database error:', err); // Log error with more context
      return res.status(500).json({ error: 'Failed to retrieve user' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

app.listen(3000, () => console.log('Server listening on port 3000'));