module.exports = {
    apps: [
      {
        name: 'sm-user-service',
        script: 'dist/server.js',
        env: {
          NODE_ENV: 'production',
        },
      }
    ]
  };
  