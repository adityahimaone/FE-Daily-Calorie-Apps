const { withModuleFederation } = require("@module-federation/nextjs-mf");
const { dependencies } = require("./package.json");

module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_SECRET: process.env.REACT_APP_SECRET,
  },
};
