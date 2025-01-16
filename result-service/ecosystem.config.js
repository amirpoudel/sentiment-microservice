module.exports = {
    apps: [
      {
        name: 'sm-result-service',
        script: 'dist/server.js',
        env: {
          NODE_ENV: 'production',
        },
      }
    ]
  };
  