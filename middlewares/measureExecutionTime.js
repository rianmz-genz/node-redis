function measureExecutionTime(req, res, next) {
    const startHrTime = process.hrtime();
  
    res.on("finish", () => {
      const elapsedHrTime = process.hrtime(startHrTime);
      const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
      console.log(`Request to ${req.originalUrl} took ${elapsedTimeInMs} ms`);
    });
  
    next();
  }
  
  module.exports = measureExecutionTime;
  