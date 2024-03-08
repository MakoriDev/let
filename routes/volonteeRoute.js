const express = require('express');
const router = express.Router();

module.exports = (pool) => {

  router.post('/volunteer', async (req, res) => {
    try {
      // Extract form data from request body
      const { fullName, phoneNumber, occupation, message } = req.body;

      // TODO: Add form validation here

      // Prepare the SQL query
      const sql = `INSERT INTO volunteers (fullName, phoneNumber, occupation, message) VALUES (?, ?, ?, ?)`;

      // Execute the SQL query
      await pool.query(sql, [fullName, phoneNumber, occupation, message]);

      // Send a response back
      res.redirect('/thank-you'); // Or any other response you wish to send
    } catch (error) {
      console.error('Error inserting volunteer data:', error);
      res.status(500).send('Error processing your request');
    }
  });

  return router;
};
