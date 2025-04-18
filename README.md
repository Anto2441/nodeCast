# 🌦️ nodecast

A simple and efficient Node.js weather API that fetches data from a 3rd party weather service and caches it using Redis.

---

## 🚀 Features

- Fetch weather data by city
- Redis caching with 12h expiration
- Visual Crossing Weather API integration
- Secure environment variables
- Rate limiting to prevent abuse

---

## 🛆 Tech Stack

- Node.js
- Express.js
- Redis
- Axios
- dotenv
- express-rate-limit

---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nodecast.git
cd nodecast
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file at the root of the project:

```env
PORT=3000
REDIS_URL=redis://localhost:6379
WEATHER_API_KEY=your_visual_crossing_api_key
WEATHER_API_BASE_URL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline
```

### 4. Start Redis

If Redis is installed locally:

```bash
redis-server
```

Or via Homebrew:

```bash
brew services start redis
```

### 5. Run the app

```bash
npm run dev
```

---

## 🌐 API Endpoint

### `GET /api/weather/:city`

Fetches current weather for a given city.

**Example:**

```
GET http://localhost:3000/api/weather/london
```

**Sample response:**

```json
{
  "location": "London, GB",
  "temperature": "15°C",
  "conditions": "Partly Cloudy",
  "source": "cache"
}
```

---

## 🛡️ Rate Limiting (in progress)

Limits each IP to **100 requests per 15 minutes** using `express-rate-limit`.

---
