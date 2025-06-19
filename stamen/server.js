const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  const newEntry = {
    name,
    email,
    message,
    submittedAt: new Date().toISOString()
  };

  // Save to a JSON file (simulating database)
  const filePath = path.join(__dirname, 'submissions.json');
  let submissions = [];

  if (fs.existsSync(filePath)) {
    submissions = JSON.parse(fs.readFileSync(filePath));
  }

  submissions.push(newEntry);
  fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));

  res.json({ status: 'success', message: 'Form submitted successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
