module.exports = {
    apps: [
      {
        name: 'sm-auth-service',
        script: 'dist/server.js',
        env: {
          NODE_ENV: 'production',
        },
      }
    ]
  };
  