module.exports = {
  name: 'server',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/server',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
