const express = require("express");
// const cluster = require("cluster");
const app = express();
// const numCPUs = require("os").cpus().length;
// console.log(numCPUs);
function delay(dur) {
  const startTime = Date.now();
  while (Date.now() - startTime < dur) {
    // console.log("hello world");
  }
}

app.get("/", (req, res) => {
  res.send(`Performance homepage managed by : ${process.pid}`);
});
app.get("/timer", (req, res) => {
  delay(3000);
  res.send(`Timer homepage managed by : ${process.pid}`);
});

// Worker thread

console.log("Worker thread started");
app.listen(9000, () =>
  console.log(`server is up and running at port 9000.....`)
);

// worker threads vs cluster module in node

// ChatGPT
// In Node.js, both worker threads and the cluster module are mechanisms that allow developers to handle concurrent operations and scale applications, but they serve different purposes.

// Worker Threads:

// Introduction: Worker threads in Node.js provide a way to run JavaScript code in parallel, leveraging multiple threads. This is especially useful for computationally intensive tasks that can be parallelized.
// Use Cases: Worker threads are suitable for tasks such as heavy computation, image processing, and other CPU-bound operations. Each worker thread runs in a separate thread, allowing parallel execution.
// Communication: Worker threads communicate with the main thread through a message-passing mechanism. They can exchange data using the postMessage method and handle messages with event listeners.
// Example:
// javascript
// Copy code
// const { Worker } = require('worker_threads');

// const worker = new Worker('./path/to/worker.js');
// worker.postMessage({ message: 'Hello from main thread!' });
// worker.on('message', (data) => {
//   console.log('Received message from worker:', data);
// });
// Pros: Fine-grained control over parallelism, suitable for CPU-bound tasks.
// Cons: Overhead of message passing, potential complexity in managing shared resources.
// Cluster Module:

// Introduction: The cluster module in Node.js allows the creation of child processes (worker processes) that share the same server port. Each worker process runs its own instance of the Node.js event loop.
// Use Cases: Cluster module is typically used for scaling applications across multiple CPU cores. Each worker process runs on a separate core, providing horizontal scalability for applications.
// Communication: Worker processes in the cluster module communicate with each other through inter-process communication (IPC). They can share server sockets and distribute incoming requests.
// Example:
// javascript
// Copy code
// const cluster = require('cluster');
// const numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//   // Fork workers
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
// } else {
//   // Worker code
//   // ...
// }
// Pros: Efficient use of multiple CPU cores, automatic load balancing, and easy horizontal scaling.
// Cons: Limited control over individual worker processes, suited for I/O-bound tasks.
// Choosing Between Worker Threads and Cluster Module:

// Use Case: Choose worker threads for CPU-bound tasks where parallelism is crucial. Choose the cluster module for horizontal scaling and efficient use of multiple CPU cores, particularly for I/O-bound tasks.
// Complexity: Worker threads provide more fine-grained control but may add complexity due to manual management of shared resources. The cluster module simplifies scaling by managing child processes automatically.
// Communication Overhead: Worker threads communicate through message passing, which incurs some overhead. Cluster workers communicate through IPC, which can be more efficient for certain use cases.
// Ultimately, the choice between worker threads and the cluster module depends on the specific requirements of your application and the type of workload it needs to handle.
