const app = require('./app');
const MongoConnect = require('./src/config/mongo');

MongoConnect();

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server Node is running in PORT ${process.env.PORT}!`),
);
