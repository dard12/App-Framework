import { user } from '../index';

user.get('/profile', function(req, res) {
  res.send(req.user);
});
