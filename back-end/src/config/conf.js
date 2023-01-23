require('dotenv').config()
const databaseUrl = process.env.DB_URL;
const port = process.env.LIVE_PORT;
module.exports = {
  databaseUrl,
  port,
};
