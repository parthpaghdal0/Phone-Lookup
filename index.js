
const { server, app } = require('./src/express_setup');
const routesV1 = require('./src/routes/v1');
const database = require('./src/database');

routesV1(app);