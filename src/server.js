import express from 'express';

import rateLimiter from './middlewares/rateLimiter.js';
import weatherRoutes from './routes/weatherRoutes.js';
import dotenvConfig from './config/dotenv.js';

dotenvConfig();

const app = express();
const PORT = process.env.PORT || 3000;

//  Middleware to parse JSON
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/api/weather', weatherRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
