const speciesService = require("../services/speciesService");

async function getSpeciesData(req, res) {
  const species = req.params.species;

  try {
    const cacheResults = await speciesService.getCachedData(species);
    if (cacheResults) {
      res.send({
        fromCache: true,
        data: cacheResults,
      });
      // After responding, update the cache asynchronously
      speciesService.updateCache(species);
    } else {
      const results = await speciesService.getSpeciesData(species);
      res.send({
        fromCache: false,
        data: results,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
}

module.exports = {
  getSpeciesData,
};
