const ratelimit = require('../config/upstash.js');

const rateLimiter = async (req, res, next) => {
  try {
    const { success, reset } = await ratelimit.limit(req.ip); // limiting based on IP address
    // const { success, reset } ... We destrucutured the success and reset since .limit() return an object if we use 
    // const {success} = await ratelimit.limit()
    // success is an object returned but we want to get the boolean so we destructure it as success and reset 
    if (!success) {
      res.set('Retry-After', Math.floor((reset - Date.now()) / 1000));
      return res.status(429).json({ msg: "Too many requests" });
    }

    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(error);
  }
};

module.exports = rateLimiter;
