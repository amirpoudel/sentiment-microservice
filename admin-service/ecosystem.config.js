module.exports = {
    apps: [
      {
        name: 'sm-admin-service',
        script: 'dist/server.js',
        env: {
          NODE_ENV: 'production',
        },
      }
    ]
  };
  