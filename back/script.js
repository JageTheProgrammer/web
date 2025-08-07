router.get('/main', (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/login');
    }
    res.send('Welcome to the main page!');
  });
  