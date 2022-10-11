import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const signinHelper = () => {
  // build a fake JWT payload. { id, email }
  const id = new mongoose.Types.ObjectId().toHexString();
  const email = 'mansour@kalagar.net';
  const password = 'Mansour@1142';

  // Create a JWT!
  const token = jwt.sign({ id, email, password }, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string that's the cookie with the encoded data
  return [`session=${base64}`];
};

export const generateId = () => {
  return new mongoose.Types.ObjectId().toHexString();
};
