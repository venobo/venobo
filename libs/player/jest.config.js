module.exports = {
  name: 'player',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/player',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
