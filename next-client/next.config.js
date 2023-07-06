/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");
// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: "static/chunks/remoteEntry.js",
        exposes: {},
        remotes: {
          home: `http://127.0.0.1:5001/assets/remoteEntry.js`,
        },
        shared: {},
      })
    );
    return config;
  },
};

module.exports = nextConfig;
