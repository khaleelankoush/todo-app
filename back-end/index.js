const express = require('express');
const bodyParser = require('body-parser');
const statuses = require('./src/routes/statuses.js');
const tasks = require('./src/routes/tasks.js');
const mongodb = require('./src/config/mongoose.js');
const { port } = require('./src/config/conf.js');
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: '*',
  })
);
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/statuses', statuses);
app.use('/api/tasks', tasks);
app.listen(port || 3000, () => {
  console.log(`running on port ${port || 3000}`);
});
