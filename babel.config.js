module.exports = (api) => {
  const isTest = api.env('test');
  if (isTest) {
    return {
      presets: ['@babel/preset-env', ['@babel/preset-react', { useBuiltIns: true }]]
    };
  }

  return {
    presets: ['react-app']
  };
};
