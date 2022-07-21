import mongoose from 'mongoose';
import app from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
  console.log('===================  START  ===================');
  console.log('connected to mongodb');
  console.log('===================   END   ===================');
};

app.listen(3000, () => {
  console.log('===================  START  ===================');
  console.log('listening on port 3000!!');
  console.log('===================   END   ===================');
});

start().catch((err) => {
  console.error(err);
});
