const { isMainThread, workerData, Worker } = require("worker_threads");
if (isMainThread) {
  console.log(`Main thread process id: ${process.pid}`);

  new Worker(__filename, {
    workerData: [7, 5, 8, 3],
  });
  new Worker(__filename, {
    workerData: [3, 7, 31, 1],
  });
} else {
  console.log(`Worker threads pid: ${process.pid}`);

  console.log(`${workerData} sorted is ${workerData.sort()}`);
}
