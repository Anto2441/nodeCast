import dotenv from 'dotenv';

const dotenvConfig = () => {
  dotenv.config();
  if (!process.env.PORT) {
    throw new Error('⚠️ Missing required environment variables!');
  }
};

export default dotenvConfig;
