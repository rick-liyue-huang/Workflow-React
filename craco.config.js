const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "skyblue",
              "@font-size-base": "18px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
