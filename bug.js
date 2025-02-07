const express = require('express');
const app = express();
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Missing error handling for invalid userId
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error(err); // Log the error, but don't handle it gracefully
      res.status(500).send('Something went wrong'); // Generic error message
    } else if (results.length === 0) {
      res.status(404).send('User not found'); //correct
    } else {
      res.json(results[0]);
    }
  });
});

app.listen(3000, () => console.log('Server listening on port 3000'));