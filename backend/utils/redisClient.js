const redis = require('redis');
const { REDIS_URL } = process.env;

const client = redis.createClient(REDIS_URL);

client.on('error', (err) => {
  console.error('Redis error: ', err);
});

module.exports = client;
