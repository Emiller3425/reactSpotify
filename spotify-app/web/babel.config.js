module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', {
      // Allows Babel to automatically determine where to import the JSX factory function from
      'runtime': 'automatic' 
    }]
  ]
};
