import mongoose from 'mongoose';
import config from './config';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.dbUri);
    console.log(
      `🍃 Database Connected Successfully ${conn.connection.host} - ${conn.connection.db?.databaseName}`,
    );
  } catch (error) {
    console.log(`Database Connection Error ${error}`);
    process.exit(1);
  }
};
