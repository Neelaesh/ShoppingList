const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');
const config = require('./Configurations/config');
const authenticationRoutes = require('./Routers/authenticationRouter');
const adminRoutes = require('./Routers/adminRouter');
const consumerRoutes = require('./Routers/consumerRouter');
const vendorRoutes = require('./Routers/vendorRouter');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));

app.use('/', authenticationRoutes);
app.use('/admin', adminRoutes);
app.use('/consumer', consumerRoutes);
app.use('/vendor', vendorRoutes);

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));