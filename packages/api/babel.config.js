module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ts', '.json'],
        alias: {
          '@test': ['./src/test/'],
        },
      },
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ]
  ],
};
