// const dotenv = require('dotenv');
// dotenv.config();
// const Ratelimit = require('@upstash/ratelimit');
// const Redis = require('@upstash/redis');

// // create ratelimiter that allows 10 requests per 20 seconds
// const ratelimit = new Ratelimit({
//     redis: Redis.fromEnv(), --- Because Redis.fromEnv() won't work unless you're in an ESM setup and have a compatible version, you can manually initialize the Redis instance like this:
//     limiter: Ratelimit.slidingWindow(5, '10 s'),
// });

// module.exports = ratelimit;

const dotenv = require('dotenv');
dotenv.config();

const { Ratelimit } = require('@upstash/ratelimit');
const { Redis } = require('@upstash/redis');

// Initialize Redis instance with env variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create rate limiter (5 requests per 15 seconds)
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '15 s'),
});

module.exports = ratelimit;
