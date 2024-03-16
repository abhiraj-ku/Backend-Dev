function checkLimit(req, res) {
  const downloadCount = {};
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; // Get the client's IP address

  // Initialize the download count for each IP address if it doesn't exist
  if (!downloadCount[ip]) {
    downloadCount[ip] = {
      count: 0,
      timeStamp: Date.now(),
    };
  }

  const currentTime = Date.now();
  let { timeStamp } = downloadCount[ip];
  let Count = downloadCount[ip].count;
  console.log(Count);
  const oneHourLimit = 60 * 60 * 1000;

  // Check if an hour has passed, then reset the limit
  if (currentTime - timeStamp > oneHourLimit) {
    downloadCount[ip] = {
      count: 1,
      timeStamp: currentTime,
    };
  } else {
    Count++;
  }
  // Log the download count for debugging purposes
  console.log(`Download count for IP ${ip}: ${downloadCount[ip].count}`);

  if (downloadCount[ip].count > 3) {
    return res.status(429).send("Download limit exceeds for this IP address");
  }
}

export default checkLimit;
