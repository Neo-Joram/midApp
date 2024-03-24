// conection.js

const { Pool } = require("pg");

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString: `postgres://neojoram:QOobstYUbMjYuglffUB5BVnYi3O8Alx4@dpg-cnskuoi1hbls73fsd77g-a.oregon-postgres.render.com/mobiledev`,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
