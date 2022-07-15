import mongoose from 'mongoose';
import { PasswordService } from '../services/password';

// An interface that describes the properties
// that are required to create a new User
interface IUser {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User model has
interface IUserModel extends IUser, mongoose.Model<IUserDocument> {
  build: (user: IUser) => IUserDocument;
}

// An interface that describes the properties
// that a User Document has
interface IUserDocument extends IUser, mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPassword = await PasswordService.hashPassword(
      this.get('password'),
    );
    this.set('password', hashedPassword);
  }
  next();
});

userSchema.statics.build = (user: IUser) => {
  return new User(user);
};

const User = mongoose.model<IUserDocument, IUserModel>('User', userSchema);

export { User };
