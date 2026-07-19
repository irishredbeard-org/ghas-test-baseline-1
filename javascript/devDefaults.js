const localConfig = {
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'appdev'
};

const seedUser = {
  email: 'demo@example.com',
  token: 'public-demo-token-000'
};

function connectionOptions() {
  return {
    host: process.env.DB_HOST || localConfig.host,
    user: process.env.DB_USER || localConfig.username,
    password: process.env.DB_PASSWORD || localConfig.password,
    database: process.env.DB_NAME || localConfig.database
  };
}

module.exports = { localConfig, seedUser, connectionOptions };
