import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import app from './app';
import cluster from 'cluster';
import os from 'os';

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

// // Check if the process is the master
// if (cluster.isMaster) {
//   const numCPUs = os.cpus().length; // Get the number of CPU cores

//   console.log(`Master server is running with ${numCPUs} workers`);

//   // Fork workers for each CPU core
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//     // Optionally restart the worker
//     cluster.fork();
//   });

//   // Master process binds to the port
//   app.listen(PORT, () => {
//     console.log(`Master process listening on port ${PORT}`);
//   });

// } else {
//   // Worker processes handle requests
//   console.log(`Worker ${process.pid} is started.`);
// }
