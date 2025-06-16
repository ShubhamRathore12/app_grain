// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add resolver configuration
config.resolver.alias = {
  "@": "./src", // Adjust path as needed
};

// Ensure all file extensions are resolved
config.resolver.assetExts.push("db", "mp3", "ttf", "obj", "png", "jpg");

module.exports = config;
