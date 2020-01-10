/**
 * Ecosystem file for PM2 supervisor
 */

module.exports = {
  apps: [
    {
      name: 'app',
      script: './src/app.js',
      env: {
        NODE_ENV: 'local'
      },
      env_dev: {
        NODE_ENV: 'dev'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      env_e2e: {
        NODE_ENV: 'e2e'
      },
    },
  ]
};
