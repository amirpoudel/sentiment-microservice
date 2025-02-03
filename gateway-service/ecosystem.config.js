module.exports = {
    apps: [
      {
        name: 'sm-gateway-service',
        script: 'dist/server.js',
        env: {
          NODE_ENV: 'production',
        },
      }
    ]
  };
  