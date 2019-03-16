import { mongoose } from './mongoose';
import bcrypt from 'bcrypt';

export interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
  displayName: string;
  facebookId: string;
  googleId: string;
}

const UsersSchema = new mongoose.Schema<UserDoc>({
  username: String,
  password: String,
  displayName: String,
  facebookId: String,
  googleId: String
});

const Users = mongoose.model<UserDoc>('Users', UsersSchema);

UsersSchema.pre('save', function(this: UserDoc, next) {
  if (this.isNew && this.password) {
    const saltRounds = 10;

    bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      this.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
});

export default Users;
