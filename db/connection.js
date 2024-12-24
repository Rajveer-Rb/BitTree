import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('Already connected to database');
    return mongoose.connection.asPromise();
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database:', connection.connection.name); // Logs the database name
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
  }
};


export default connectDB;