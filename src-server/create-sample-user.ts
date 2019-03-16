import mongoose from 'mongoose';
import Users from './models/users';

Users.countDocuments({ username: 'test@gmail.com' }).then(count => {
  if (!count) {
    const testUser = new Users({
      _id: mongoose.Types.ObjectId('5b47e88804a18d35d98ab14a'),
      username: 'test@gmail.com',
      password: 'test123'
    });

    testUser.save();
  }
});
