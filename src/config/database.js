module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'vuttr',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
