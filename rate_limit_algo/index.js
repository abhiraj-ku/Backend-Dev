import TokenBucket from "./tokenBucket.js";
const bucket = new TokenBucket(4, 4, 2);

bucket.handleRequest("user1");
bucket.handleRequest("user1");
bucket.handleRequest("user1");
bucket.handleRequest("user1");
bucket.handleRequest("user1");

setTimeout(() => {
  bucket.handleRequest("user1");
  bucket.handleRequest("user1");
  bucket.handleRequest("user1");
  bucket.handleRequest("user1");
  bucket.handleRequest("user1");
  bucket.handleRequest("user1");

  setTimeout(() => {
    bucket.handleRequest("user1");
  }, 3000);
}, 3000);
