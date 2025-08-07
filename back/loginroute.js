router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) return res.status(400).send('Invalid email or password.');
  
    if (user.status !== 'approved') {
      return res.status(403).send('Your registration is not approved yet.');
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
  
    // Successful login: create session or JWT token here
    req.session.userId = user._id; // example using session
    res.redirect('/main');
  });
  