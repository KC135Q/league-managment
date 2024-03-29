const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('abac_basic', 'postgres', 'rootroot', {
  host: 'localhost',
  dialect: 'postgres', // Set the dialect to 'postgres' for PostgreSQL
  port: 5432, // Default PostgreSQL port
  define: {
    schema: 'member_schema', // Specify your schema name
    freezeTableName: true, // Do not pluralize table names
  },
  logging: false,
});

module.exports = sequelize;
