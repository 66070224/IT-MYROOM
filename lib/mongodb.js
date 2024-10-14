import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 1) {return;}
  
  try {
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
