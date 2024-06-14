const axios = require("axios");
const redis = require("redis");

let redisClient;

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

async function fetchApiData(species) {
  const apiResponse = await axios.get(
    `https://www.fishwatch.gov/api/species/${species}`
  );
  console.log("Request sent to the API");
  return apiResponse.data;
}

async function getFromCache(species) {
  const cacheResults = await redisClient.get(species);
  return cacheResults ? JSON.parse(cacheResults) : null;
}

async function updateCache(species, data) {
  await redisClient.set(species, JSON.stringify(data), {
    EX: 180,
    NX: false, // Allow overwriting the existing cache
  });
  console.log(`Cache updated for species: ${species}`);
}

async function cacheData(species, data) {
  await redisClient.set(species, JSON.stringify(data), {
    EX: 180,
    NX: true,
  });
}

module.exports = {
  fetchApiData,
  getFromCache,
  updateCache,
  cacheData,
};
