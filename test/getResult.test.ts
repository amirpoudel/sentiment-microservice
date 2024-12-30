import autocannon , { Result } from "autocannon";

async function runTest() {
  const instance = autocannon({
    url: "http://localhost:7000/api/v1/reviews/", // target URL
    method: "GET", // HTTP method

    connections: 1000, // number of concurrent connections
    duration: 20 // test duration in seconds
  },
(err: Error | null, result: Result) => {
            if (err) {
                console.error('Error during the test:', err);
            } else {
                console.log('Test completed:', result);
            }
        });

  autocannon.track(instance, { renderProgressBar: true });
}



runTest().catch((error) => {
    console.error('Error executing upload test:', error);
});
