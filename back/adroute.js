router.get('/admin/approve/:id', async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, { status: 'approved' });
      res.send('User approved successfully.');
    } catch (error) {
      res.status(500).send('Error approving user.');
    }
  });
  
  router.get('/admin/reject/:id', async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, { status: 'rejected' });
      res.send('User rejected successfully.');
    } catch (error) {
      res.status(500).send('Error rejecting user.');
    }
  });
  