const postcss = require('postcss');
const postcssimport =  require('postcss-import');
const tailwind = require('tailwindcss');
const lightningcss = require('postcss-lightningcss');

module.exports = (eleventyConfig) => {
  eleventyConfig.addTemplateFormats('css');

  eleventyConfig.addExtension('css', {
    outputFileExtension: 'css',
    compile: async (content, inputPath) => {
      if (inputPath !== './src/assets/css/entry.css') {
        return;
      }

      return async () => {
        let output = await postcss([
          postcssimport,
          tailwind,
          lightningcss({
            browsers: 'defaults',
            lightningcssOptions: {
              minify: (process.env.NODE_ENV === "production")
            },
          }),
        ]).process(content, { from: inputPath });

        return output.css;
      }
    }
  });

};