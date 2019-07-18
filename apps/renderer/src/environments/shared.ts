// Shared environment variables
const isElectron = () => typeof process === 'object' && process.versions['electron'];

export default {
  isElectron,
};
