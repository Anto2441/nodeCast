import request from 'supertest';
import app from '../server.js';

describe('Get /weather', () => {
  it('should return weather data for a valid city', async () => {
    const response = await request(app).get('/api/weather/paris');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('temperature');
  });

  it('should return 404 if city is missing', async () => {
    const response = await request(app).get('/api/weather');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});
