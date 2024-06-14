const speciesRepository = require("../repositories/speciesRepository");

async function getCachedData(species) {
  return await speciesRepository.getFromCache(species);
}

async function updateCache(species) {
  try {
    const results = await speciesRepository.fetchApiData(species);
    if (results.length > 0) {
      await speciesRepository.updateCache(species, results);
    }
  } catch (error) {
    console.error(`Error updating cache for species: ${species}`, error);
  }
}

async function getSpeciesData(species) {
  const results = await speciesRepository.fetchApiData(species);
  if (results.length === 0) {
    throw new Error("API returned an empty array");
  }
  await speciesRepository.cacheData(species, results);
  return results;
}

module.exports = {
  getCachedData,
  updateCache,
  getSpeciesData,
};
