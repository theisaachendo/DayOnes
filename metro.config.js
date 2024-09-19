const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// Adding custom configuration to handle too many open files issue
const customConfig = {
  watchFolders: ['./'], // Ensure this points to your project root
  maxWorkers: 2,        // Reduce the number of workers to minimize file watchers
};

module.exports = mergeConfig(defaultConfig, customConfig);
