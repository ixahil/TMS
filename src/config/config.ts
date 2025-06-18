import dotenv from 'dotenv';

dotenv.config();

interface config {
  port: number;
  nodeEnv: string;
  dbUri: string;
  jwtSecret: string;
  publicKey: string;
  privateKey: string;
  urlEndpoint: string;
}

const config: config = {
  port: Number(process.env.PORT) || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUri: process.env.DBURI || 'mongodb://localhost:27017/tms',
  jwtSecret: process.env.JWT_SECRET || 'jwtsecret',
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
};

export default config;
