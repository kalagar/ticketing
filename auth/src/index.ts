import mongoose from 'mongoose';
import app from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('JWT_KEY must be defined');
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('===================  START  ===================');
  console.log('AUTH service : connected to mongodb');
  console.log('===================   END   ===================');
};

app.listen(3000, () => {
  console.log('===================  START  ===================');
  console.log('AUTH service : listening on port 3000!!');
  console.log('===================   END   ===================');
});

start().catch((err) => {
  console.error(err);
});
