import axios from 'axios';
import redisClient from '../services/redisClient.js';
export const getWeather = async (req, res) => {
  const { city } = req.params;
  const apiKey = process.env.VISUAL_CROSSING_API_KEY;
  const baseUrl = process.env.WEATHER_API_URL;
  const redisKey = `weather:${city.toLowerCase()}`;

  try {
    // 1.Check Redis cache
    const cachedData = await redisClient.get(redisKey);
    if (cachedData) {
      console.log('✅ Data from Redis cache');
      return res.json(JSON.parse(cachedData));
    }

    // 2. Call external API
    const url = `${baseUrl}/${encodeURIComponent(
      city
    )}?unitGroup=metric&key=${apiKey}&contentType=json`;
    const response = await axios.get(url);
    const data = response.data;

    const formatted = {
      city: data.resolvedAddress,
      temperature: `${data.currentConditions.temp}°C`,
      condition: data.currentConditions.conditions,
      humidity: `${data.currentConditions.humidity}%`,
      windSpeed: `${data.currentConditions.windspeed} km/h`,
    };

    // 3. Cache in Redis for 12h
    await redisClient.setEx(redisKey, 43200, JSON.stringify(formatted)); // 12h cache
    console.log('💾 Data cached in Redis');

    res.json(formatted);
  } catch (error) {
    console.error('❌ Error fetching weather:', error.message);

    if (error.response?.status === 400 || error.response?.status === 404) {
      res.status(404).json({ error: 'City not found or bad request.' });
    } else {
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
};
