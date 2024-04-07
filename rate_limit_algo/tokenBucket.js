import chalk from "chalk";

export default class TokenBucket {
  constructor(cap, refilAmount, refilTime) {
    this.cap = cap;
    this.refilAmount = refilAmount;
    this.refilTime = refilTime;
    this.db = {};
  }

  //refil bucket
  refilBucket(key) {
    if (this.db[key] == undefined) return null;

    const { tokens, timeStamp } = this.db[key];
    const currentTime = Date.now();
    const elapsedTime = Math.floor(
      (currentTime - timeStamp) / (this.refilTime * 1000)
    );
    const newTokens = elapsedTime * this.refilAmount;

    this.db[key] = {
      tokens: Math.min(this.cap, tokens + newTokens),
      timeStamp: currentTime,
    };
    return this.db[key];
  }

  // create bucket
  createBucket(key) {
    if (this.db[key] == undefined) {
      this.db[key] = {
        tokens: this.cap,
        timeStamp: Date.now(),
      };
    }
    return this.db[key];
  }

  // handleRequest(key) {
  //   let bucket = this.createBucket(key);
  //   const currentTime = Date.now();

  //   // check if time has past for the req or not
  //   const elapsedTime = Math.floor((currentTime - bucket.timeStamp) / 1000);
  //   if (elapsedTime >= this.refilTime) {
  //     bucket = this.refilBucket(key);
  //   } else {
  //     if (bucket?.token <= 0) {
  //       console.log(
  //         chalk.red(
  //           `Request Rejected for  ${key} (token -${
  //             bucket.tokens
  //           }) -- ${new Date().toLocaleTimeString()}\n`
  //         )
  //       );
  //       return false;
  //     }
  //   }
  //   if (!bucket) {
  //     chalk.red(
  //       `Request[REJECTED] for ${key} -- ${new Date().toLocaleTimeString()} -- BUCKET NOT FOUND\n`
  //     );
  //     return false;
  //   }
  //   console.log(
  //     chalk.green(
  //       `Request[ACCEPTED] for ${key} (tokens - ${
  //         bucket.tokens
  //       }) -- ${new Date().toLocaleTimeString()}\n`
  //     )
  //   );
  //   bucket.token = -1;
  //   return true;
  // }

  handleRequest(key) {
    let bucket = this.createBucket(key);
    const currentTime = Date.now();

    // check if the time elapsed since the (convert to seconds)
    const elapsedTime = Math.floor((currentTime - bucket.timeStamp) / 1000);

    if (elapsedTime >= this.refilTime) {
      bucket = this.refilBucket(key);
    } else {
      if (bucket?.tokens <= 0) {
        console.log(
          chalk.red(
            `Request[REJECTED] for ${key} (tokens - ${
              bucket.tokens
            }) -- ${new Date().toLocaleTimeString()}\n`
          )
        );
        return false;
      }
    }

    if (!bucket) {
      chalk.red(
        `Request[REJECTED] for ${key} -- ${new Date().toLocaleTimeString()} -- BUCKET NOT FOUND\n`
      );
      return false;
    }

    console.log(
      chalk.green(
        `Request[ACCEPTED] for ${key} (tokens - ${
          bucket.tokens
        }) -- ${new Date().toLocaleTimeString()}\n`
      )
    );
    bucket.tokens -= 1;
    return true;
  }
}
