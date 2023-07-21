import express from 'express';
import authRoutes from './routes/auth';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

dotenv.config();

// app.get('/', (req, res) => res.send('merda de galinha!!!!'));

// Set the 'strictQuery' option to false to address the deprecation warning
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('Connected to mongodb');

    // Allow us to utilize the express body from this express application
    app.use(express.json());
    //this is saying that what ever client that is that we want can connect to the server
    //in a real project might want to change it because it is not the ideal
    app.use(cors());
    app.use('/auth', authRoutes);

    app.listen(8080, () => {
      console.log('now listening on port 8080');
    });
  })
  .catch((err) => {
    console.error(err);
    throw new Error(err);
  });
