module.exports = {
    apps: [
      {
        name: 'sm-ingestion-service',
        script: 'dist/server.js',
        env: {
          NODE_ENV: 'production',
        },
      }
    ]
  };
  