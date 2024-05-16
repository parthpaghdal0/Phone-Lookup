const webhook = require('./webhook');

module.exports = (app) => {
  app.use('/webhook/v1', webhook);
};
