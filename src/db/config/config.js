require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "database_development",
    host: "src/db/data/data.sqlite",
    dialect: "sqlite",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "DB_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // para Render
      },
    },
  },
};
