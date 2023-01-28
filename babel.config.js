module.exports = {
  presets: ["react-app"],
  env: {
    production: {
      presets: [["@babel/preset-react", { useBuiltIns: true }]],
    },
    development: {
      presets: [["@babel/preset-react", { useBuiltIns: true }]],
    },
    test: {
      presets: [["@babel/preset-react", { useBuiltIns: true }]],
    },
  },
};
