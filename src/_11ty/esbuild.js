const esbuild = require('esbuild');

module.exports = (eleventyConfig) => {
  eleventyConfig.addTemplateFormats('js');

  eleventyConfig.addExtension('js', {
    outputFileExtension: 'js',
    compile: async (content, inputPath) => {
      const minify = process.env.NODE_ENV === 'production';

      if (inputPath !== './src/assets/js/entry.js') {
        return;
      }

      return async () => {
        let output = await esbuild.build({
          entryPoints: [inputPath],
          bundle: true,
          minify: minify,
          write: false,
        });

        return output.outputFiles[0].text;
      };
    },
  });
};
