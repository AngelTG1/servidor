import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/realtime-questions')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));
    } catch (err) {
    console.error(err);
    process.exit(1);
    }
};

export default connectDB;
