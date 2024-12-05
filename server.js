const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

function checkWorkingHours(req, res, next) {
  const now = new Date();
  const dayOfWeek = now.getDay(); 
  const hour = now.getHours();    

  if (req.originalUrl === '/closed') {
    return next();
  }

  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
    // Proceed to the next middleware/route handler
    return next();
  } else {
    return res.redirect('/closed');  // Redirect to /closed page
  }
}

app.use(checkWorkingHours);

// Routes for the pages
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// Route for "Closed" page
app.get('/closed', (req, res) => {
  res.render('closed'); // Will render a 'closed.ejs' file
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${3000}`);
});
