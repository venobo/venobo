module.exports = (config) => {
  // config.target = 'electron-main';
  config.resolve.mainFields = ['main'];
  return config;
};
